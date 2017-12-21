// webpack dev与prod公共的配置文件
'use strict'
// Template version: 1.2.5
// see http://vuejs-templates.github.io/webpack for documentation.

// 引入node的path模块做路径处理
const path = require('path')

// 重头戏部分，配置完成后暴露出去的部分
module.exports = {
    // dev部分
    dev: {

        // Paths
        // 输出的二级目录，根目录是dist，当然指的是打包之后
        assetsSubDirectory: 'static',
        // 根目录
        assetsPublicPath: '/',
        // 解决跨域请求
        proxyTable: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api': {
                target: 'https://www.dongqiudi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },

        // Various Dev Server settings
        // 域名
        host: 'localhost', // can be overwritten by process.env.HOST
        // 端口
        port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        // 自动打开浏览器
        autoOpenBrowser: false,
        // 错误展示
        errorOverlay: true,
        // 错误提示
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },
    // prod环境
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}