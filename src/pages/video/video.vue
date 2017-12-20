<template>
    <div class="video">
        <ul class="channel">
            <li 
                class="channel-item" 
                v-for="(item,index) in channels" 
                v-text="item.label" 
                :data-type="item.type"
                :class="{active:index===channelIndex}"
                @click="changeChannel(index,$event.target.dataset.type)"
                >
            </li>
        </ul>
        <Scroll 
            class="scroll"
            :pullup="true"
            :data="videoList"
            @scrollToEnd="getMoreVideo"
            >
            <div class="content">
                <ul class="list">
                    <router-link :to="{path:'detail',query:{id:item.id}}" tag="li" class="item" v-for="item in videoList" :key="item.id">
                        <div class="left">
                            <img v-lazy="item.litpic" class="poster" :alt="item.title">
                            <img src="../../common/images/play.png" class="play" alt="">
                        </div>
                        <div class="right">
                            <h3 class="desc">{{item.title}}</h3>
                            <span class="comments">{{item.comments_total}}条评论</span>
                        </div>
                    </router-link>
                </ul>
            </div>
            <Loading v-show="!videoList.length"></Loading>
        </Scroll>
    </div>
</template>
<script>
import { getVideo } from "../../api/video";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";
export default {
  name: "Video",
  data() {
    return {
      channels: [
        {
          label: "不可描述",
          type: 43
        },
        {
          label: "集锦",
          type: 11
        }
      ],
      channelIndex: 0,
      channelType: 43,
      curPage: 0,
      videoList: [],
    };
  },
  components: {
    Scroll,
    Loading
  },
  created() {
    this._getVideo();
  },
  mounted() {
    setTimeout(() => {}, 20);
  },
  methods: {
    changeChannel(index, type) {
      this.channelIndex = index;
      // type留着切换数据用
      this.channelType = type;
      this._getVideo(this.curPage, this.channelType);
    },
    _getVideo() {
      getVideo(this.curPage, this.channelType).then(res => {
        this.videoList = res.data.list.articles;
      });
    },
    getMoreVideo() {
      getVideo(++this.curPage, this.channelType).then(res => {
        this.videoList = this.videoList.concat(res.data.list.articles);
      });
    }
  }
};
</script>
<style lang="less">
@import url("../../common/style/variable.less");
.video {
  position: fixed;
  top: 2.25rem;
  bottom: 0;
  width: 100%;
  .channel {
    text-align: center;
    line-height: 1rem;
    border-bottom: 1px solid @color-border-gray;
    font-size: 0;
    .channel-item {
      display: inline-block;
      font-size: 0.4rem;
      margin: 0 0.2rem;
      border-bottom: 2px solid #fff;
      &.active {
        border-bottom-color: @color-text-green;
        color: @color-text-green;
      }
    }
  }
  .scroll {
    height: 100%;
    overflow: hidden;
    .content {
      .list {
        .item {
          border-bottom: 1px solid @color-border-gray;
          display: flex;
          //   align-items: center;
          justify-content: center;
          position: relative;
          padding: 0.2rem;
          .left {
            flex: 2;
            margin-right: 0.3rem;
            position: relative;
            .poster {
              width: 100%;
            }
            .play {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              // width: 100%;
              width: 1rem;
              height: 1rem;
              margin: auto;
            }
          }
          .right {
            flex: 5;
            .desc {
              font-size: 0.42rem;
              font-weight: normal;
              line-height: 0.6rem;
            }
            .comments {
              position: absolute;
              right: 0.3rem;
              bottom: 0.2rem;
              font-size: 0.3rem;
              color: @color-text-gray;
            }
          }
        }
      }
    }
  }
}
</style>