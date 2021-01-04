<template>
  <section>
      <nav-bar title="关于" back> </nav-bar>
      <van-list>
        <van-cell v-for="i in infos" :title="i.title" :label="i.label" :key="i.title"/>
      </van-list>
  </section>
</template>
<script>
import NavBar from "./NavBar.vue"
export default {
  components: {
    NavBar
  },
  data() {
    return {
      infos: [{
        title: "版本",
        label: "0.1.0"
      }, {
        title: "关于应用",
        label: "作者基于自己的需求，利用闲暇时间开发的，区别于其他记账本app，此应用..."
      }, {
        title: "关于我",
        label: "前端搬砖工"
      }, {
        title: "发送邮件",
        label: "个人邮箱jimmy19910104@163.com，有问题可以发邮件给我"
      }, {
        title: "源代码",
        label: "代码托管在github(https://github.com/gesilar/account-book.git)，欢迎吐槽"
      }, {
        title: "打赏开发者",
        label: "没脸要。。。"
      }, ]
    }
  }
}
</script>
<style scoped>
.van-cell {
  margin: 8px 0;
}
</style>