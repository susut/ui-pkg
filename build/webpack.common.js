const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const md = require('markdown-it')();  // 引入markdown-it
const slugify = require('transliteration').slugify; // 引入transliteration中的slugify方法
const striptags = require('./strip-tags') // 引入strip-tags.js文件
/**
 * 由于cheerio在转换汉字时会出现转为Unicode的情况,所以我们编写convert方法来保证最终转码正确
 * @param  {[String]} str e.g  &#x6210;&#x529F;
 * @return {[String]}     e.g  成功
 */
function convert(str) {
    str = str.replace(/(&#x)(\w{4});/gi, function($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
    });
    return str;
}
/**
 * 由于v-pre会导致在加载时直接按内容生成页面.但是我们想要的是直接展示组件效果,通过正则进行替换
 * hljs是highlight.js中的高亮样式类名
 * @param  {[type]} render e.g '<code v-pre class="test"></code>' | '<code></code>'
 * @return {[type]}        e.g '<code class="hljs test></code>'   | '<code class="hljs></code>'
 */
function wrap(render) {
    return function() {
        return render.apply(this, arguments)
            .replace('<code v-pre class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">');
    };
}

const vueMarkdown = {
    raw: true,
    // 定义处理规则
    preprocess: (MarkdownIt, source) => {
        // 对于markdown中的table,
        MarkdownIt.renderer.rules.table_open = function() {
            return '<table class="table">';
        };
        // 对于代码块去除v-pre,添加高亮样式
        MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
        return source;
    },
    use: [
        [require('markdown-it-anchor'), {
            level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
            slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
            permalink: true, // 开启标题锚点功能
            permalinkBefore: true // 在标题前创建锚点
        }],
        // 'markdown-it-container'的作用是自定义代码块
        [require('markdown-it-container'), 'demo', {
            // 当我们写::: demo :::这样的语法时才会进入自定义渲染方法
            validate: function(params) {
                return params.trim().match(/^demo\s*(.*)$/);
            },
            // 自定义渲染方法,这里为核心代码
            render: function(tokens, idx) {
                let m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                // nesting === 1表示标签开始
                if (tokens[idx].nesting === 1) {
                    let description = (m && m.length > 1) ? m[1] : ''; // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
                    let content = tokens[idx + 1].content; // 获得内容
                    let html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1'); // 解析过滤解码生成html字符串
                    let script = striptags.fetch(content, 'script'); // 获取script中的内容
                    let style = striptags.fetch(content, 'style'); // 获取style中的内容
                    let jsfiddle = { html: html, script: script, style: style }; // 组合成prop参数,准备传入组件
                    // 是否有描述需要渲染
                    let descriptionHTML = description
                        ? md.render(description)
                        : '';

                    jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle)); // 将jsfiddle对象转换为字符串,并将特殊字符转为转义序列
                    // 起始标签,写入demo-block模板开头,并传入参数
                    return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                    <div class="source" slot="source">${html}</div>
                    ${descriptionHTML}
                    <div class="highlight" slot="highlight">`;
                }
                // 否则闭合标签
                return '</div></demo-block>\n';
            }
        }],
        [require('markdown-it-container'), 'tip'],
        [require('markdown-it-container'), 'warning']
    ]
};


function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css', '.less'],
        alias: {
            '@': resolve('../src')
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, '../src')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader, // 分离样式
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader", // translates CSS into CommonJS
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: 'vue-markdown-loader/lib/markdown-compiler',
                        options: vueMarkdown
                    }
                ]

            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "./theme/[name].css"
        })
    ]
};
