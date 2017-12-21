<template>
  <div id="app">
    <MyHeader />
    <Tab v-show="detailFlag" />
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader";
import Tab from "./components/Tab";
import Slider from "./components/Slider";
export default {
  name: "App",
  components: {
    MyHeader,
    Tab,
    Slider
  },
  data() {
    return {
      detailFlag: true
    };
  },
  watch: {
    $route(to, form) {
      if (to.name === "detail") {
        this.detailFlag = false;
      } else {
        this.detailFlag = true;
      }
    }
  }
};
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
