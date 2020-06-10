module.exports = {
    title: 'ui-pkg',
    description: 'test ui pkg',
    extraWatchFiles: [
        'element/button.md'
    ],
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
};
