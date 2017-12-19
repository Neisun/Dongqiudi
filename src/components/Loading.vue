<template>
    <div class="loading">
        <img src="../common/images/loading.gif" alt="">加载中...
    </div>
</template>
<script>
export default {
  name: "Loading"
};
</script>
<style lang="less">
@import url('../common/style/variable.less');
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20% 0;
  font-size: 0.4rem;
  color: @color-text-gray;
  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
  }
}
</style>
