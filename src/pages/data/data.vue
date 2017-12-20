<template>
    <div class="data">
        <!-- 几大联赛 -->
        <ul class="leagueBar bar">
            <li v-for="(item,index) in leagues":class="{active:index === curLeagueIndex}" @click="changeLeague(item,index)">
                {{item.title}}
            </li>
        </ul>
        <!-- 类别 -->
        <ul class="rankBar bar">
            <li v-for="(item,index) in types" :class="{selected:index === curRankTypeIndex}" @click="changeType(item,index)">
                {{item.title}}
            </li>
        </ul>
        <Scroll class="scroll" ref="scroll" :data="datas">
          <div class="content">
            <Score :scores="datas" v-if="curRankType==='team_ranking' && datas.length" @updateScroll="refresh"></Score>
            <Goal :goal="datas" v-if="curRankType==='goal_ranking' && datas.length" @updateScroll="refresh"></Goal>
            <Assist :assist="datas" v-if="curRankType==='assist_ranking' && datas.length" @updateScroll="refresh"></Assist>
            <Schedule :schedule="datas" v-if="curRankType==='schedule' && datas.length" @updateScroll="refresh"></Schedule>
          </div>
          <Loading v-show="!datas.length"></Loading>
        </Scroll>
    </div>
</template>
<script>
import Scroll from "../../components/Scroll";
import Score from '../rank/score'
import Goal from '../rank/goal'
import Assist from '../rank/assist'
import Schedule from '../rank/schedule'
import Loading from '../../components/Loading'
import {getRank} from '../../api/rank'
export default {
  name: "Data",
  components: {
    Scroll,
    Score,
    Goal,
    Assist,
    Schedule,
    Loading
  },
  data() {
    return {
      leagues: [
        { title: "中超", league: 51, id: 39713, gameweek: 30 },
        { title: "英超", league: 8, id: 41547, gameweek: 38 },
        { title: "意甲", league: 13, id: 42011, gameweek: 38 },
        { title: "西甲", league: 7, id: 41509, gameweek: 38 },
        { title: "德甲", league: 9, id: 41485, gameweek: 38 },
        { title: "中甲", league: 148, id: 39175, gameweek: 30 }
      ],
      types: [
        { title: "积分榜", type: "team_ranking" },
        { title: "射手榜", type: "goal_ranking" },
        { title: "助攻榜", type: "assist_ranking" },
        { title: "赛程榜", type: "schedule" }
      ],
      // 当前联赛下标
      curLeagueIndex: 0,
      // 当前联赛
      curLeague:{ title: "中超", league: 51, id: 39713, gameweek: 30 },
      // 当前种类下标
      curRankTypeIndex: 0,
      // 当前排名种类
      curRankType:'team_ranking',
      teamRank:[],
      goalRank:[],
      assistRank:[],
      schedule:[]
    };
  },
  methods: {
    changeLeague(item,index) {
      this.clearRank();
      this.curLeagueIndex = index;
      this.curLeague = item;
      this._getRank('team_ranking',this.curLeague);
    },
    changeType(item,index) {
      this.curRankTypeIndex = index;
      this.curRankType = item.type;
      this._getRank(this.curRankType,this.curLeague);
    },
    clearRank() {
      this.curRankTypeIndex = 0;
      this.curRankType = 'team_ranking';
      this.teamRank = [];
      this.goalRank = [];
      this.assistRank = [];
      this.schedule = [];
    },
    _getRank(type,league) {
      getRank(type,league).then((res) => {
        switch (type) {
          case 'team_ranking':
            console.log('team_ranking',res);
            this.teamRank = res.data[0].rankings;
            break;
          case 'goal_ranking':
            console.log('goal_ranking',res)
            this.goalRank = res.data;
            break;
          case 'assist_ranking':
            console.log('assist_ranking',res)
            this.assistRank = res.data;
            break;
          case 'schedule':
            console.log('schedule',res)
            this.schedule = res.data.matches;
            break;
          default:
            throw Error('type error');
            break;
        }
      })
    },
    refresh(){
      this.$refs.scroll.refresh();
    }
  },
  created() {
    this._getRank('team_ranking',this.curLeague);
  },
  mounted() {
    setTimeout(() => {}, 20);
  },
  computed:{
    datas() {
      let obj = {
        'team_ranking':this.teamRank,
        'goal_ranking':this.goalRank,
        'assist_ranking':this.assistRank,
        'schedule':this.schedule
      }
      return obj[this.curRankType];
    }
  }
};
</script>
<style lang="less">
@import url("../../common/style/variable.less");
.data {
  .bar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid @color-border-gray;
    &.rankBar {
      background: @color-bg-rankBar;
      color: @color-text-white;
      li {
        line-height: 1.2rem;
        &.selected {
          color: @color-text-green;
        }
      }
    }
    li {
      flex: 1;
      height: 100%;
      font-size: 0.4rem;
      line-height: 1.4rem;
      text-align: center;
      border-bottom: 1px solid #fff;
      &.active {
        border-bottom-color: @color-text-green;
        color: @color-text-green;
      }
    }
  }
  .scroll {
    position: fixed;
    top: 5rem;
    bottom: 0;
    overflow: hidden;
    width: 100%;
  }
}
</style>


