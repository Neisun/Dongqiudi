<template>
    <ul class="tab">
        <router-link v-for="(channel,index) in channels" :to="channel.path" tag="li" :key="index">{{channel.name}}</router-link>
    </ul>
</template>
<script>
export default {
    name:'Tab',
    data() {
        return {
            channels:[
                {name:'资讯',path:'news'},
                {name:'赛程',path:'race'},
                {name:'视频',path:'video'},
                {name:'数据',path:'data'}
            ]
        }
    }
}
</script>
<style lang="less">
@import url('../common/style/variable.less');
.tab {
    display: flex;
    width: 100%;
    line-height: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
    background: #fff;
    li {
        flex: 1 1 auto;
        text-align: center;
        border-bottom: 1px solid @color-bg-tab;
        &.activeChannel{
            border-bottom-color: @color-border-green;
            color:@color-text-green;
        }
    }
}
</style>


