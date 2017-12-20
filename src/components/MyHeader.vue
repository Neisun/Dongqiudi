<template>
    <div class="myHeader">
        <header>
            <i class="iconfont icon-fanhui" v-show="detailFlag" @click="back"></i>
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
            siderBarFlag:false,
            detailFlag:false
        }
    },
    methods:{
        showSiderBar() {
            this.siderBarFlag = true;
        },
        closeSiderBar() {
            this.siderBarFlag = false;
        },
        back(){
            history.back();
        }
    },
    watch:{
        '$route'(to,from){
            // console.log(to);
            // console.log(from)
            if (to.name==='detail') {
                this.detailFlag = true;
            }else{
                this.detailFlag = false;
            }
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
        .icon-fanhui{
            font-size: 0.6rem;
            position: absolute;
            top: 0;
            left:0.3rem;
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


