<template>
  <section>
    <nav-bar title="设置" back> </nav-bar>
    <van-list finished-text="没有更多了">
      <van-cell v-for="s in settings" :key="s.funcName" :border="false" :title="s.title" @click="s.handler"/>
    </van-list>
  </section>
</template>
<script>
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      settings: [{
        funcName: "backup",
        title: "备份到本地",
        handler: () => {
          this.$store.dispatch("backup");
        }
      },{
        funcName: "restore",
        title: "恢复到本地",
        handler: () => {
          this.$store.dispatch("restore");
        }
      }]
    }
  }
}
</script>