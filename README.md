# football-vue

> 模仿懂球帝的一个移动端项目

关于项目的构建,在这里做一个仔细的记录.

> 需要做的一些准备工作

- vue-cli构建工具快速完成项目结构搭建
- 对于移动端开发，自适应是必不可少的。所以，我引入rem.js。更好的方案是flexible.js，毕竟阿里大佬出品。
- 样式方面，我采用less进行开发。在开发过程中你需要，安装less与less-loader。
- rem布局的问题，我决定引入淘宝rem高清布局方案，解决在不同手机上，实现适配方案。这种方案，最主要的用处在于写固定不变的高度，并不是所有的都适用。移动端布局基准主要在于百分比，弹性盒，rem三者搭配起来使用。才能造就一个比较完美的移动端屏幕适配。
- 关于路由方面。我们的组件要实现懒加载，按需加载。于是`const Foo = () => import('../components/foo')`，还有关于一些路由参数的获取，需要去官网看一下api。记不住。。。
- 字体图标，我们直接用iconfont，采用样式引入的方式，开发起来更加方便与顺手。

> 开发过程

*每个组件都需要引入less变量*
1. header部分组件，引入less变量，这是vue-cli的一个缺陷。我们先在各自的组件中定义各自的变量，最后再整合一下。
1. siderbar组件部分，同样需要引入less变量。布局，添加组件的属性，用来显示与隐藏；安装一下vue-lazyload，用来给图片懒加载。vuelazyload组件使用方式，很简单。但有一点需要你去注意，就是在标签中的img的src需要是一个变量，所以，如果使我们本地的图片，我们需要用require这种方式，`imgUrl: require("../common/images/logo.png")`。siderbar组件是header的子组件，这里需要传递一个属性，来控制siderbar组件的显示与隐藏，同时还需要传递一个自定义事件。自定义事件部分容易弄混，在组件上绑定一个变量，就是最终在子组件中$emit出去的。动画效果的添加，transition标签的使用。这里的效果是一个进来的时候，从右划入。所以，在进入之前，需要`translateX(100%)`，当然直接`translate3d()`也未尝不可。
1. tab组件部分，tab组件是导航栏，用来动态切换各种资讯信息。直接把`router-link`转化为`li`标签，添加`tag='li'`属性。布局采用flex，非常方便。关于当前激活状态，直接在router/index.js中配置，linkActiveClass。
1. 轮播与scroll组件部分，这块也算是一个技术点，比较好玩。我们引入`better-scroll`插件，这个与vue搭配起来非常好用的组件。关于这个东西的使用，我们去掘金上查一篇文章《当vue遇上better-scroll》非常详细的用法指导，而且可以基于better-scroll封装一个非常棒的滑动的组件，无论是横着滑动还是竖着滑动，都有很好的体验。我们在作者的github找到，关于轮播图用法。从写法中，我们能学到颇多的东西。我们创建了一个轮播图组件，以后就可以直接使用。注意参数配置问题，以后随着项目的变化，我们可以随时更改。起初，以为这个轮播图是要放到`App.vue`中，但其实不然，应该放置到`news.vue`中。至于为什么使用`better-scroll`，我觉得原因很简单，就是因为能处理手势还有功能比较丰富。一个插件，可以完美解决上下滚动，上拉下拉数据加载，以及轮播，还有各种滚动。何乐不为，而且，我们做了一定程度上的封装之后，在以后的项目中可以非常方便的使用。
1. news组件。组件的布局倒是很简单很方便，一个轮播图组件，早已经写好，轮播图组件的高度是由图片撑起来的。还有就是新闻列表，对于新闻列表，每个`li`的布局用flex，移动端最方便的布局。下边就是配置axios，然后配置服务器代理，去请求懂球帝的数据。

> 核心配置部分
    
    因为涉及到跨域，所以需要代理。在config/index文件中，我们可以配置跨域的请求。
    具体参数如下

```js    
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
```
记得配置完成之后，需要对重新run dev，不然配置并不会立即生效。我折腾了好久，一直以为自己的配置出现了问题。其实不是。。。。

接下来，我们把http请求部分单独提出来，封装成一个单独的函数。

```js
// 专门用来配置axios的基础配置
import axios from 'axios'
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 100000
// 配置拦截器
// Add a request interceptor
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response) {
    // Do something with response data
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});

//   配置完成之后暴露模块
export default axios
```
然后我新建api文件夹专门用来存放，我们的各种请求方法。

比如news.js

```js
// 获取资讯
import axios from '../common/js/http'

export function getNews(page) {
    let url=`/mobile/tab/1/archives?page=${page}`
    console.log(url)
    return axios.request({
        method:'get',
        url:url
    })
}
```
新闻列表可以加载出来，还需要添加图片懒加载，以及解决click事件的延迟问题，所以引入在main.js中引入fastclick，引入之前需要记得把依赖安装一下。

同时需要给新闻列表的图片加上懒加载图片，还有数据没加载过来时候的loading。那么就需要一个loding组件，所以，我们需要写一个loading组件。

6. loading组件。loding组件部分非常简单，没太多的技术含量。一个gif图片，需要注意在页面中出现的位置。
1. race组件最麻烦的在于处理数据，结构倒不是很麻烦。在处理数据方面倒是值得一提，因为涉及到处理时间对象的问题。我们知道，我们大天朝在东8区，所以我们的时间是早于格林威治时间8小时。于是我们得到的所有的数据都是不对的，都需要对时间进行处理。接口返回的数据，是一周内所有比赛的结果与播出时间。而我们真正想要的数据是按照日期给我们排好的，比如‘12月19日’，然后是一堆数据列表。这些逻辑我都放在race.vue中做了详细的说明。
1. data组件。data组件乍一看，很麻烦。确实是有一个联赛导航，有一个各种排行榜的导航，通过二者的改变，来动态的改变下边的数据。下边的每个数据都是一个组件。具体的逻辑思路在代码中。
1. detail组件部分，用来显示新闻与视频页每天消息点击之后展示的页面。直接用iframe了。此处，怎么从新闻和视频页跳转过来，并且带着参数。用路由里边的$route.query，每一条消息都是带着参数。

至此，所有的开发工作基本完成。回过头来，我们做一个总结。上述开发过程基本是一个比较完整的开发过程，从项目搭建，到页面布局，到功能实现，各个模块与组件的划分，都基本单独提出来。便于维护，实现低耦合。

总结一下：
- 项目是怎么搭建的？用的vue-cli客户端工具。
- 这是一个什么项目？移动端的项目，那么怎么实现适配？引用flexible.js，阿里的高清布局方案。那么，基本上我们的单位就由px => rem。
- 移动端会出现点透事件，与click的延迟，怎么解决？引入fastclick依赖。怎么用？最基本的使用方法：`fastclick.attach(document.body)`。
- 图片懒加载。图片懒加载vue-lazyload,配置方法，建议看一下文档，基本上我只用了最基本的用法。
- 移动端数据上拉与下拉刷新。引入`better-scroll`，封装一个scroll组件。非常方便，这一块，我决定单独拿出来，方便以后的使用。
- 轮播图，轮播图，本想自己手写。但由于在移动端有处理手势的问题，正好`better-scroll`可以封装移动端的轮播图，于是，封装成一个slider组件。这块，也决定单独拿出来，方便以后的使用。
- 动画部分。我就直接用了transition手写的动画，当然可以引入动画库。手写动画需要理解好，vue动画的几个过程，可以去官网看看，相信看一下就懂了，但是我总记不住。
- 数据请求。如果说，我在本地开发过程中直接去请求人家懂球帝的接口数据，你觉得会不会出现问题。会出现跨域问题。那么需要配置proxyTable。在config/index.js下，做如下配置:

```js
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
}
```
然后配置完成之后，记得重新跑一遍项目，上边时候提到过，不然配置不生效。

代理配置完成之后。就是请求了。
- axios。现在算是标配了。axios可以非常灵活的进行配置。一般情况下，会对各个模块的请求进行划分，提出来。如同项目目录文件夹下api中的配置一样。基本的配置如同上文提到的，不啰嗦赘述了。
- 区分生产环境与开发环境。可以根据process.env.NODE_ENV，进行区分，来对数据请求的接口做划分，比如你们有开发环境和生产环境。
- 再说打包，打包时候，需要改为`assetsPublicPath: './'`,不然路径会出现问题。

基本上所有的注意事项都总结完毕。

> 如何使用本项目？

    先clone到本地

> 安装依赖

    npm install

> 开发环境运行

    npm run dev

> 生产环境打包

    npm run build

预览地址: [预览](https://fe-hns.github.io/Dongqiudi/dist/index.html)

由于预览是打包之后，在github域名下请求懂球帝数据，会存在跨域问题，好多数据加载不出来。建议在开发环境下预览。