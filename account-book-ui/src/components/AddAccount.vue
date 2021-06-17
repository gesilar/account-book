<template>
  <section>
    <nav-bar title="添加账户" back> </nav-bar>
    <van-field
      clickable
      v-model="name"
      label="账户名"
      maxlength="5"
    />
    <type-selector v-model="selected"></type-selector>
    <van-button @click="onAddAcct" round  type="info" class="add-btn" >新增</van-button>
  </section>
</template>
<script>
import NavBar from "./NavBar.vue";
import TypeSelector from "./TypeSelector.vue";
import router from "../router";
export default {
  components: {
    TypeSelector,
    NavBar,
  },
  data() {
    return {
      name: "",
      selected: []
    };
  },
  methods: {
    onAddAcct() {
      const {name, selected} = this;
      if (this.name === "" || this.selected.length === 0) {
        return;
      }
      this.$store.dispatch("addAcct", {name, includeTypes: selected});
      router.back();
    },
  },
};
</script>

<style scoped>
.add-btn {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;

}
</style>
