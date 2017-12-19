<template>
    <table class="goal table">
        <thead>
            <tr>
                <th>排名</th>
                <th>球员</th>
                <th class="team">球队</th>
                <th>进球数</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in goal">
                <td>{{++index}}</td>
                <td>{{item.name}}</td>
                <td class="team"><img :src="'https://img.dongqiudi.com/data/pic/'+item.team_id+'.png'" alt="">{{item.team_name}}</td>
                <td>{{item.count}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
  name: "Goal",
  props: {
    goal: {
      type: Array
    }
  },
  mounted() {
      setTimeout(() => {
      	this.$emit('updateScroll')
      },20)
  }
};
</script>
<style lang="less">

</style>

