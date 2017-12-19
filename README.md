# football-vue

> 模仿懂球帝的一个移动端项目

关于项目的构建,在这里做一个仔细的记录.

> 需要做的一些准备工作

- vue-cli构建工具快速完成项目结构搭建
- 对于移动端开发，自适应是必不可少的。所以，我们引入rem.js。更好的方案是flexible.js，毕竟阿里大佬出品。
- 样式方面，我们采用less进行开发。在开发过程中你需要，安装less与less-loader。
- rem布局的问题，我决定引入淘宝rem高清布局方案，解决在不同手机上，实现适配方案。这种方案，最主要的用处在于写固定不变的高度，并不是所有的都适用。移动端布局基准主要在于百分比，弹性盒，rem三者搭配起来使用。才能造就一个比较完美的移动端屏幕适配。
- 关于路由方面。我们的组件要实现懒加载，按需加载。于是`const Foo = () => import('../components/foo')`，还有关于一些路由参数的获取，需要去官网看一下api。记不住。。。
- 字体图标，我们直接用iconfont，采用样式引入的方式，开发起来更加方便与顺手。

> 开发过程

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
        target: 'https://www.dongqiudi.com/mobile/tab/1/archives?page=2',
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
新闻列表可以加载出来，还需要添加图片懒加载，以及解决click事件的延迟问题，所以引入在main.js中引入fastclick。

同时需要给新闻列表的图片加上懒加载图片，还有数据没加载过来时候的loading。那么就需要一个loding组件，所以，我们需要写一个loading组件。

5. loading组件。loding组件部分非常简单，没太多的技术含量。
1. race组件最麻烦的在于处理数据，结构倒不是很麻烦。在处理数据方面倒是值得一提，因为涉及到处理时间对象的问题。我们知道，我们大天朝在东8区，所以我们的时间是早于格林威治时间8小时。于是我们得到的所有的数据都是不对的，都需要对时间进行处理。接口返回的数据，是一周内所有比赛的结果与播出时间。而我们真正想要的数据是按照日期给我们排好的，比如‘12月19日’，然后是一堆数据列表。这些逻辑我都放在race.vue中做了详细的说明。
1. data组件。data组件乍一看，很麻烦。确实是有一个联赛导航，有一个各种排行榜的导航，通过二者的改变，来动态的改变下边的数据。下边的每个数据都是一个组件。具体的逻辑思路在代码中。

未完待续，还差detail，详情没写，详情略麻烦，正在考虑中。。。
