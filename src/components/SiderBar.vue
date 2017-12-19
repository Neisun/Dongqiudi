<template>
        <div class="siderBar">
            <transition name="slide">
                <div class="author" v-show="showFlag">
                    Neisun
                    <div class="avatar">
                        <img v-lazy="imgUrl" alt="">
                    </div>
                    <div class="desc">
                      这是一个什么项目？这是一个足球爱好者，出于对足球的无限热爱然后模仿的一个项目。对于本项目，如果你觉得喜欢就star，不喜欢也不要喷宝宝。宝宝写项目也不容易，多谢。
                    </div>
                    <i class="iconfont icon-guanbi" @click="close"></i>
                </div>
            </transition>
            <div class="mask" v-show="showFlag" @click="close"></div>
        </div>
</template>
<script>
export default {
  name: "SiderBar",
  props: {
    showFlag: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      imgUrl: require("../common/images/logo.png")
    };
  },
  methods: {
    close() {
      this.$emit("closeMethod");
    }
  }
};
</script>
<style lang="less">
@import url("../common/style/variable.less");
.siderBar {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: @color-bg-mask;
    z-index: 998;
  }
  .author {
    width: 50%;
    background: @color-bg-sider;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    padding-top: 2rem;
    text-align: center;
    font-size: 0.5rem;
    color: @color-text-white;
    transition: all 0.5s ease;
    &.slide-enter,
    &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .avatar {
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .desc {
      font-size: 0.4rem;
      line-height: 1.4;
    }
    .icon-guanbi {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 0.6rem;
      cursor: pointer;
    }
  }
}
</style>


