<template>
  <section>
    <nav-bar title="添加类别" back> </nav-bar>
    <van-field
      clickable
      v-model="text"
      label="类别名"
      maxlength="4"
    />
    <icon-selector v-model="selected"></icon-selector>
    <footer class="footer">
      <van-button @click="onAddType" round  type="info" class="add-btn" >新增</van-button>
    </footer>
  </section>
</template>
<script>
import NavBar from "./NavBar.vue";
import IconSelector from "./IconSelector";
import router from "../router";
export default {
  components: {
    NavBar,
    IconSelector
  },
  data() {
    return {
      text: "",
      selected: ""
    }
  },
  methods: {
    onAddType: function() {
      this.$store.dispatch("addTypes", {text: this.text, icon: this.selected});
      router.back();
    }
  }
}
</script>
<style scoped>
.footer {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>