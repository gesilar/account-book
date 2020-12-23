<template>
  <section>
    <ul class="type-selector">
      <li v-for="tItem in types" :key="tItem.text" class="type-option">
        <van-icon :name="tItem.icon" @click="onTypeSelectClick(tItem.text)" :color="selected.indexOf(tItem.text) > -1 ? `red` : undefined"></van-icon>
        <a class="type-text">{{ tItem.text }}</a>
      </li>
      <!-- <li class="type-option add">
        <van-icon name="add" @click="onAddTypeClick"></van-icon>
        <a class="type-text">添加</a>
      </li> -->
    </ul>
  </section>
</template>
<script>
import { mapState } from "vuex";
const defaultTypes = [
  { text: "过年", icon: "gift" },
  { text: "节日", icon: "cart" },
  { text: "教育", icon: "fire" },
  { text: "旅游", icon: "gold-coin" },
  { text: "保险", icon: "like" }
  ];
export default {
  model: {
    prop: "selected",
    event: "getValue"
  },
  props: {
    selected: Array
  },
  computed: mapState({
    types: (state) => {
      return state.types.length === 0 ? defaultTypes : state.types;
    },
  }),
  methods: {
    onAddTypeClick() {},
    onTypeSelectClick(text) {
      const index = this.selected.indexOf(text);
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(text);
      }
      this.$emit("getValue", this.selected);
    },
  },
};
</script>

<style scoped>
.type-selector {
  display: flex;
  padding: 16px;
}
.type-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 8px;
}
.type-text {
  font-size: 8px;
  display: inline-block;
  transform: scale(0.8);
}
</style>
