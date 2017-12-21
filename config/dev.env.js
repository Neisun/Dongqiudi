// 开发环境配置的文件，表明是dev环境 NODE_ENV: '"development"'
'use strict'
// merge 一个合并的插件，可以把对象，数组等合并
// webpack-merge提供了一个merge连接数组和合并对象来创建一个新对象的函数。如果遇到函数，它将执行它们，通过算法运行结果，然后将返回的值再次包含在一个函数中。

// 这个行为在配置webpack时特别有用，尽管它已经超越了它。无论何时需要合并配置对象，webpack-merge都可以派上用场。


const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
