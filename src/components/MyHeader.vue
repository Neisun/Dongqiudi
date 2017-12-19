<template>
    <div class="myHeader">
        <header>
            <i class="iconfont icon-zuqiu"></i>
            爆炸足球
            <i class="iconfont icon-siderbar" @click="showSiderBar"></i>
        </header>
        <SiderBar :showFlag="siderBarFlag" @closeMethod="closeSiderBar" />
    </div>
</template>
<script>
import SiderBar from './SiderBar'
export default {
    name:'MyHeader',
    components:{
        SiderBar
    },
    data() {
        return {
            siderBarFlag:false
        }
    },
    methods:{
        showSiderBar() {
            this.siderBarFlag = true;
        },
        closeSiderBar() {
            this.siderBarFlag = false;
        }
    }
}
</script>
<style lang="less">
// 每个组件都需要引入变量，这是没办法的事情，在全局引入找不到变量
@import url('../common/style/variable.less');
.myHeader {
    header {
        width: 100%;
        height: 1.2rem;
        background: @color-bg-header;
        font-size: 0.4rem;
        text-align: center;
        line-height: 1.2rem;
        color: @color-text-white;
        position: relative;
        .icon-zuqiu {
            font-size: 0.6rem;
        }
        .icon-siderbar {
            font-size: 0.5rem;
            display: inline-block;
            position: absolute;
            top: 0;
            right: 2px;
            cursor: pointer;
        }
    }
}
</style>


