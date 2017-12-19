<template>
  <div id="app">
    <MyHeader />
    <Tab />
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
      
    }
  }
};
</script>

<style lang="less">

</style>
