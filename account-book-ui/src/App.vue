<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {},
  created() {
    this.$store.dispatch("getData");
  },
};
</script>
<style scoped>
.wrapper {
  justify-content: center;
  flex-direction: row;
}
.logo {
  width: 424px;
  height: 200px;
}
.greeting {
  text-align: center;
  margin-top: 70px;
  font-size: 50px;
  color: #41b883;
}
.message {
  margin: 30px;
  font-size: 32px;
  color: #727272;
}
</style>
