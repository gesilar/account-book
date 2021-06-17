<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>
<script>
const handleHomeBackButtonClick = (function () {
  let exitAppTicker = 0;
  return function(e) {
    e.preventDefault();
    if (location.hash !== "#/") {
      if (exitAppTicker == 0) {
        exitAppTicker++;
        window.plugins.toast.showLongCenter("再按一次退出!");
        setTimeout(function () {
          exitAppTicker = 0;
        }, 2000);
      } else if (exitAppTicker == 1) {
        navigator.app.exitApp(); //退出app
      }

    }
  }
})();
export default {
  name: "App",
  methods: {},
  created() {
    this.$store.dispatch("getData");
    window.addEventListener("backbutton", handleHomeBackButtonClick);
  },
};
</script>
<style>
html {
  height: 100%;
}
body {
  height: 100%;
  background: white;
}
@media screen and (min-width: 375px) and (max-width: 425px) {
  body {
    zoom: 1.25;
  }
}
@media screen and (min-width: 425px) {
  body {
    zoom: 1.5;
  }
}
</style>
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
