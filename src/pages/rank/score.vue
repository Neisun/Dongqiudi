<template>
    <table class="score table">
        <thead>
          <tr>
            <th></th>
            <th class="team">球队</th>
            <th>场</th>
            <th>胜</th>
            <th>负</th>
            <th>平</th>
            <th>进/失</th>
            <th>积分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in scores">
            <td>{{item.rank}}</td>
            <td class="team"><img :src="'https://img.dongqiudi.com/data/pic/'+item.team_id+'.png'" alt=""><span>{{item.club_name}}</span></td>
            <td>{{item.matches_total}}</td>
            <td>{{item.matches_won}}</td>
            <td>{{item.matches_lost}}</td>
            <td>{{item.matches_draw}}</td>
            <td>{{item.goals_pro}}/{{item.goals_against}}</td>
            <td>{{item.points}}</td>
          </tr>  
        </tbody>
    </table>
</template>
<script>
export default {
  name: "Score",
  props: {
    scores: {
      type: Array
    }
  },
  mounted() {
    // 经验函数，this.$nextTick的时间是17ms左右，我们这么写简便
    setTimeout(() => {
      this.$emit("updateScroll");
    }, 20);
  }
};
</script>
<style lang="less">

</style>
