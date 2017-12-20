<template>
  <div id="app">
    <MyHeader />
    <Tab v-show="detailFlag" />
    <router-view/>
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
	Slider,
  },
  data() {
    return {
      detailFlag:true,
    }
  },
  watch:{
    '$route'(to,form){
        if (to.name==='detail') {
          this.detailFlag = false;
        }else {
          this.detailFlag = true;
        }
    }
  }
};
</script>

<style lang="less">

</style>
