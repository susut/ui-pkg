# ui-pkg
仿Element UI从0搭建，使用vuepress书写文档

## 项目初始化
- `packages/`放置各种UI组件模块
- `lib/`最终打包文件夹
- `components.json` UI组件映射

## webpack配置
- `webpack.common.js`对css/js/image/vue进行处理
- `webpack.component.js`对多个UI组件进行处理，多文件打包到lib文件夹，用于按需加载
- `webpack.componentAll.js`对整个模块进行处理，单文件打包到lib文件夹，用于全量加载
- 配置关键步骤 [library](https://blog.csdn.net/whh181/article/details/80613633)
```
library: 'ui-pkg',
libraryTarget: 'umd'
```
- 把style分离出来用 MiniCssExtractPlugin
- [process.env.NODE_ENV]((https://juejin.im/post/5a4ed5306fb9a01cbc6e2ee2))
    - node.js 原生对象 process 的 env 属性是个对象，NODE_ENV 属性并不在 process.env 对象上
    - webpack mode/DefinePlugin定义的变量作用于webpack入口文件，通常就是src下的文件；package script定义的NODE_ENV=production作用于webpack配置文件。

## 编写组件
在`packages/`文件夹编写每个组件。构建install函数，通过Vue.component注册到Vue上，别的项目引用用Vue.use()即可。
```
packages
|——button
|  |__button.vue // 组件编写
|  |__index.js // 暴露组件
|__index.js //引用所有组件，暴露组件
```
button/index.js
```javascript
import UiButton from './button.vue';

UiButton.install = function(Vue) {
    Vue.component(UiButton.name, UiButton);
};

export default UiButton;
```
packages/index.js
```javascript
import UiButton from "./button/index.js";

const components = [
    UiButton
];
const Ui = {
    UiButton
}

Ui.install = Vue => {
    components.forEach(component => Vue.component(component.name, component));
};

export default Ui;

export {
    UiButton
}
```
components.js 配置各个组件入口
```json
{
    "button": "./packages/button/index.js"
}
```

## 打包组件
- package.json的files属性，设置npm包上传时包含的文件，默认有readme.md package.json
```
"files": [
    "lib",
    "packages"
],
```
- `yarn build:lib`打包，`yarn start`运行项目
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "NODE_ENV=development webpack-dev-server --open --config webpack.dev.js",
    "dev": "NODE_ENV=development webpack --config webpack.dev.js",
    "build": "NODE_ENV=production webpack --config webpack.prod.js",
    "build:lib": "NODE_ENV=production webpack --config webpack.componentAll.js && NODE_ENV=production webpack --config webpack.component.js",
},
```

## markdown格式说明文档 [vuepress](https://www.vuepress.cn)
- 安装vuepress，新建docs文件夹，放置各种md文档及vuepress配置
```bash
yarn add -D vuepress
```
- 目录结构
  - docs/.vuepress: 用于存放全局的配置、组件、静态资源等。  
  - docs/.vuepress/components: 该目录中的 Vue 组件将会被自动注册为全局组件。
  - docs/.vuepress/theme: 用于存放本地主题。
  - docs/.vuepress/styles: 用于存放样式相关的文件。
  - docs/.vuepress/styles/index.styl: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
  - docs/.vuepress/styles/palette.styl: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
  - docs/.vuepress/public: 静态资源目录。
  - docs/.vuepress/templates: 存储 HTML 模板文件。
  - docs/.vuepress/templates/dev.html: 用于开发环境的 HTML 模板文件。
  - docs/.vuepress/templates/ssr.html: 构建时基于 Vue SSR 的 HTML 模板文件。
  - docs/.vuepress/config.js: 配置文件的入口文件，也可以是 YML 或 toml。
  - docs/.vuepress/enhanceApp.js: 客户端应用的增强。
```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```
** 注意：templates一般无需修改，如要修改最好基于默认模板文件修改 **

- `yarn docs:dev`运行vuepress，docs作为根目录
项目根目录下的package.json中添加scripts
```
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}
```
- docs/config.js配置
左侧导航配置sidebar，顶部导航配置nav，导航title会根据md文档的标题来生成
```
themeConfig: {
        nav: [
            { text: 'External', link: 'https://google.com' }
        ],
        sidebar: [
            {
                title: 'Guide',
                children: [
                    '/guide/introduce.md',
                    '/guide/use.md'
                ]
            },
            {
                title: 'Element',
                children: [
                    '/element/button.md'
                ]
            }
        ]
}
```
- docs/README.md
文档首页配置

## markdown中使用vue组件
- 展示折叠组件 docs/.vuepress/components/common-block.vue
- button-demo组件 docs/.vuepress/components/button-demo.vue
- md文档 docs/element/button.md，ClientOnly中的空格需要<4，不然无法解析（蜜汁尴尬
```
<ClientOnly>
  <button-demo></button-demo>
</ClientOnly>
```

## vue组件代码高亮 Prism
- docs/.vuepress/enhanceApp.js 引入Prism
```
import Vue from 'vue';
import Prism from 'prismjs';

Vue.prototype.prism = (codeText, type) => {
    return Prism.highlight(codeText, Prism.languages[type], type);
};

export default ({
                    Vue, // VuePress 正在使用的 Vue 构造函数
                    // options, // 附加到根实例的一些选项
                    // router, // 当前应用的路由实例
                    // siteData, // 站点元数据
                    // isServer // 当前应用配置是处于 服务端渲染 或 客户端
                }) => {
    // ...做一些其他的应用级别的优化
}
```
- docs/element/button.md 使用，注意codeText要用`<pre><code>codeText</code></pre>`包裹
```
computed: {
    html() {
        return `${this.prism(this.codeText, 'html')}`;
    }
}
```
