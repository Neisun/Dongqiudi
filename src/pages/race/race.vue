<template>
    <div class="race">
        <Scroll class="scroll" ref="scroll" :pullup="true" :data="raceList">
            <div class="content">
                <h2 class="title">最火比赛</h2>
                <ul class="raceList" v-for="itemAll in raceList">
                  <div class="timePanel">
                    {{itemAll.title}}
                  </div>
                  <li class="row" v-for="(row,index) in itemAll.item" :key="index">
                    <div class="team">
                      <div>
                        <img :src="row.team_A_logo" :alt="row.team_A_name">
                      </div>
                      <p>{{row.team_A_name}}</p>
                    </div>
                    <div class="detail">
                      <div>
                        <span>{{row.time_utc}}</span>
                        <span>{{row.competition_name}}</span>
                      </div>
                      <div>
                        {{row.status==='Played'?'已结束':'未开始'}}
                      </div>
                      <div class="score" v-if="row.status=='Played'">
                        <span>{{row.as_A}}</span>
                         - 
                        <span>{{row.as_B}}</span>
                      </div>
                    </div>
                    <div class="team">
                      <div>
                        <img :src="row.team_B_logo" :alt="row.team_B_name">
                      </div>
                      <p>{{row.team_B_name}}</p>
                    </div>
                  </li>
                </ul>
            </div>
        </Scroll>
    </div>
</template>
<script>
import Scroll from "../../components/Scroll";
import { getRace } from "../../api/race";
import {
  formatLocalHour,
  formatTimes,
  formatLocalDate
} from "../../common/js/util";
export default {
  name: "Race",
  components: {
    Scroll
  },
  data() {
    return {
      raceList: []
    };
  },
  created() {
    this._getRace();
  },
  mounted() {
    setTimeout(() => {}, 20);
  },
  methods: {
    // 本来可以愉快的使用数据，但是我们却发现，数据是按照格林威治时间，而我们的时差是+8小时，那就得转化
    // 而且，我们的数据是要分组的，按照时间（12月17日这种格式）来分组的。所以我们需要对以上所有的数据来一次大转化
    _getRace() {
      getRace().then(res => {
        // console.log(res);
        this.obj = {};
        let list = res.data.list;
        list.forEach(item => {
          // 我们需要根据当地时间，来推算我们自己的时间
          // console.log(item)
          let timeArr = item.time_utc.split(":");
          // console.log(timeArr)
          // 转化为自己的时间，转化成秒吧，毫秒的话，数字位数多了，容易蒙圈
          let time =
            parseInt(timeArr[0]) * 60 * 60 +
            parseInt(timeArr[1]) * 60 +
            parseInt(timeArr[2]) +
            28800;
          // 转化完成之后，我们得判断时间到底算在今天还是第二天
          if (item.relate_type === "program") {
            return;
          } else if (time < 86400) {
            // 说明还在今天，于是我们就放到对象中
            let key = item.date_utc;
            this.filterData(key);
            // 需要转化一下，将 20:15:15 转化为 20:15
            item.time_utc = formatLocalHour(item.time_utc);
            this.obj[key].item.push(item);
          } else {
            // +8之后，到了第二天，我们得自己转化
            let t = (item.sort_timestamp + 28800) * 1000;
            let key = formatTimes(t, "YYYY-MM-DD");
            this.filterData(key);
            //  时间同样需要转化
            item.time_utc = formatLocalHour(item.time_utc);
            this.obj[key].item.push(item);
          }
        });
        // console.log(this.obj);
        for (const key in this.obj) {
          this.raceList.push(this.obj[key]);
        }
        console.log(this.raceList);
      });
    },
    // 过滤对象用的
    filterData(key) {
      if (!this.obj[key]) {
        this.obj[key] = {
          title: formatLocalDate(key),
          item: []
        };
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../common/style/variable.less");
.race {
  position: fixed;
  top: 2.25rem;
  bottom: 0;
  width: 100%;
  .scroll {
    height: 100%;
    overflow: hidden;
    .content {
      .title {
        font-size: 0.35rem;
        padding: 0.3rem 0;
        text-align: center;
        color: @color-text-green;
        border-bottom: 1px solid @color-border-gray;
        border-top: 1px solid @color-border-gray;
      }
      .raceList {
        .timePanel {
          background: @color-bg-timePanel;
          font-size: 0.3rem;
          padding: 0.2rem;
          text-align: left;
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.32rem;
          border-bottom: 1px solid @color-border-gray;
          .team {
            flex: 2;
            padding: 0.2rem 0;
            text-align: center;
            div {
              img {
                height: 1.2rem;
              }
            }
          }
          .detail {
            flex: 3;
            padding: 0.2rem 0;
            text-align: center;
            div {
              line-height: 0.5rem;
              &.score {
                color: @color-text-green;
                font-size: 0.4rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>