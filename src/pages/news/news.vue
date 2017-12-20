<template>
    <div class="news">
        <!-- data只是用来检测数据变化，然后重新计算 -->
        <Scroll class="scroll" ref="scroll" :data="newsList" :pullup="true" @scrollToEnd="getMoreNews" >
            <!-- 滚动只对第一个元素包含的结构生效 -->
            <div class="content">
                <Slider>
                    <div v-for="item in slideList" :key="item.id">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" @load="loadImage" :alt="item.desc">
                            <p>{{item.desc}}</p>
                        </a>
                    </div>
                </Slider>
                <h2 class="title">最新资讯</h2>
                <ul class="news-list">
                    <router-link :to="{path:'detail',query:{id:item.id}}" tag="li" class="item" v-for="item in newsList" :key="item.id">
                        <div class="left">
                            <img v-lazy="item.litpic" alt="item.title">
                        </div>
                        <div class="right">
                            <h3>{{item.title}}</h3>
                            <p>{{item.description}}</p>
                        </div>
                        <span class="comments">{{item.comments_total}}评论</span>
                    </router-link>
                </ul>
            </div>
            <Loading v-show="!newsList.length"></Loading>
        </Scroll>
    </div>
</template>
<script>
import Scroll from "../../components/Scroll";
import Slider from "../../components/Slider";
import Loading from "../../components/Loading";
import { getNews } from "../../api/news";
export default {
  name: "News",
  components: {
    Scroll,
    Slider,
    Loading
  },
  data() {
    return {
      slideList: [
        {
          picUrl: require("../../common/images/5.jpg"),
          linkUrl: "https://fe-hns.github.io/hunaisong.github.io/",
          desc: "AC米兰的惨淡现状，你我他都是同谋？",
          id: 1
        },
        {
          picUrl: require("../../common/images/6.jpg"),
          linkUrl: "https://fe-hns.github.io/hunaisong.github.io/",
          desc: "数据欧洲：“一血”难丢",
          id: 2
        },
        {
          picUrl: require("../../common/images/7.jpg"),
          linkUrl: "https://fe-hns.github.io/hunaisong.github.io/",
          desc: "博卡官方：没有与特维斯进行任何谈判，尊重他现有合同",
          id: 3
        },
        {
          picUrl: require("../../common/images/8.jpg"),
          linkUrl: "https://fe-hns.github.io/hunaisong.github.io/",
          desc: "落魄豪门的救世主，泰代斯科开启名帅之路",
          id: 4
        }
      ],
      curPage: 0,
      newsList: []
    };
  },
  mounted() {
    setTimeout(() => {}, 20);
  },
  created() {
    getNews(this.curPage).then(res => {
      this.newsList = res.data.list.articles;
    });
  },
  methods: {
    getMoreNews() {
      getNews(++this.curPage).then(res => {
        this.newsList = this.newsList.concat(res.data.list.articles);
      });
    },
    //   图片异步加载的，div高度没算撑起来，需要重新计算
    loadImage() {
      if (!this.checkLoad) {
        this.checkLoad = true;
        this.$refs.scroll.refresh();
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../common/style/variable.less");
// 要实现上下滑动，布局也是十分重要的
.news {
  position: fixed;
  top: 2.25rem;
  bottom: 0;
  width: 100%;
  .scroll {
    height: 100%;
    overflow: hidden;
    .title {
      font-size: 0.35rem;
      padding: 0.3rem 0;
      text-align: center;
      color: @color-text-green;
      border-bottom: 1px solid @color-border-gray;
      border-top: 1px solid @color-border-gray;
    }
    .news-list {
      .item {
        padding: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.4rem;
        position: relative;
        border-bottom: 1px solid @color-border-gray;
        .left {
          flex: 2;
          margin: 0 0.2rem 0 0;
          img {
            width: 100%;
          }
        }
        .right {
          flex: 5;
          text-align: left;
          h3 {
            font-size: 0.4rem;
            line-height: 0.6rem;
          }
          p {
            font-size: 0.3rem;
            color: @color-text-gray;
            line-height: 0.5rem;
          }
        }
        .comments {
          position: absolute;
          right: 0.55rem;
          bottom: 0.33rem;
          color: @color-text-gray;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>