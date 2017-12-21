// run build 执行的函数，跟我对项目的配置关系不是很大，因为执行prod的功能都放在webpack.prod.conf.js中
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

// 美化bash界面的东西，类似于加载时候的loading圆圈
/**
 * 基本用法如下
 */
// const ora = require('ora');
 
// const spinner = ora('Loading unicorns').start();
 
// setTimeout(() => {
//     spinner.color = 'yellow';
//     spinner.text = 'Loading rainbows';
// }, 1000);
const ora = require('ora')
// The UNIX command rm -rf for node.删除文件夹
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()
// 每次我们run build时候，都是会先删除dist文件夹，然后在执行压缩，编译等生产环境所需要的过程，就是打包的过程。
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
