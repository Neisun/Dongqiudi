<template>
    <table class="schedule table">
        <tbody>
            <tr v-for="item in schedule">
                <th>{{item.date_utc}}</th>
                <th class="team"><img :src="'https://img.dongqiudi.com/data/pic/'+item.team_A_id+'.png'" alt="">{{item.team_A_name}}</th>
                <th>VS</th>
                <th class="team team_r">{{item.team_B_name}}<img :src="'https://img.dongqiudi.com/data/pic/'+item.team_B_id+'.png'" alt=""></th>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
  name: "Schedule",
  props: {
    schedule: {
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
