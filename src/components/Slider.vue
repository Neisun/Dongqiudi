<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot></slot>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { addClass } from "../common/js/dom";
export default {
  name: "slider",
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    this.update();
    window.addEventListener("resize", () => {
      if (!this.slide || !this.slide.enabled) {
        return;
      }
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this._onScrollEnd();
        } else {
          if (this.autoPlay) {
            this._play();
          }
        }
        this.refresh();
      }, 60);
    });
  },
  methods: {
    update() {
      if (this.slide) {
        this.slide.destroy();
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    refresh() {
      this._setSlideWidth(true);
      this.slide.refresh();
    },
    next() {
      this.slide.next();
    },
    init() {
      clearTimeout(this.timer);
      this.currentPageIndex = 0;
      this._setSlideWidth();
      if (this.showDot) {
        this._initDots();
      }
      this._initSlide();
      if (this.autoPlay) {
        this._play();
      }
    },
    // 设置slide-group的宽度
    _setSlideWidth(isResize) {
      // 找到slot插入的子组件
      this.children = this.$refs.slideGroup.children;
      //   console.log(this.children);
      let width = 0;
      let slideWidth = this.$refs.slide.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slide-item");
        child.style.width = slideWidth + "px";
        width += slideWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * slideWidth;
      }
      this.$refs.slideGroup.style.width = width + "px";
    },
    // 真正初始化slide在这里开始
    _initSlide() {
      // new一个实例
      this.slide = new BScroll(this.$refs.slide, {
        // 开启横向滚动
        scrollX: true,
        momentum: false,
        // snap参数来配置轮播
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        // 触发点击事件
        click: this.click
      });
      //   滚动结束，触发事件
      this.slide.on("scrollEnd", this._onScrollEnd);
      //   松开手指触发事件
      this.slide.on("touchend", () => {
        if (this.autoPlay) {
          this._play();
        }
      });
      //   滚动开始之前
      this.slide.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    // 滚动结束
    _onScrollEnd() {
      // 获取当前页码
      let pageIndex = this.slide.getCurrentPage().pageX;
      // 打印出来，你会发现，这不是下标，而是当前的页码1,2,3,4....
      // console.log(pageIndex)
      // 所以对应的下标，就需要在此基础上减一
      pageIndex -= 1;
      //   设置当前页码值
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slide.next();
      }, this.interval);
    }
  }
};
</script>
};
</script>
<style lang="less">
.slide {
  min-height: 1px;
  position: relative;
  .slide-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slide-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
        position: relative;
        img {
          display: block;
          width: 100%;
          // 建议最好给图片一个高度
          height: 4.5rem;
        }
        p {
          position: absolute;
          text-align: left;
          bottom: 40px;
          left:10px;
          z-index: 999;
          font-size: 0.35rem;
          color:#fff;
        }
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 0.2rem;
      height:0.2rem;
      border-radius: 50%;
      background: #ccc;
      &.active {
        width: 0.55rem;
        border-radius: 5px;
        background: #fff;
      }
    }
  }
}
</style>


