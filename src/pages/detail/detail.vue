<template>
    <div class="detail">
        <iframe :src="url" frameborder="0" name="test" id="dom01" :height="fHeight"></iframe>
    </div>
</template>
<script>
export default {
  name: "Detail",
  computed:{
      url(){
          let id = this.$route.query.id;
          return `http://www.dongqiudi.com/share/article/${id}?id=${id}&type=undefined&refer=m_website`
      },
      fHeight(){
          return window.innerHeight;
      }
  }
};
</script>
<style lang="less">
@import url("../../common/style/variable.less");
iframe {
    width: 100%;
}
</style>
