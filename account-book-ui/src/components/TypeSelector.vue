<template>
  <section>
    <ul class="type-selector">
      <li v-for="tItem in types" :key="tItem.text" class="type-option">
        <van-icon size="20px" :name="tItem.icon" @click="onTypeSelectClick(tItem.text)" :color="selected.indexOf(tItem.text) > -1 ? `red` : undefined"></van-icon>
        <a class="type-text">{{ tItem.text }}</a>
      </li>
    </ul>
  </section>
</template>
<script>
import {types} from "../constants/index";
export default {
  model: {
    prop: "selected",
    event: "getValue"
  },
  props: {
    selected: Array,
    multi: Boolean
  },
  data() {
    return {
      types
    }
  },
  methods: {
    onTypeSelectClick(text) {
      const index = this.selected.indexOf(text);
      if (!this.multi) {
        this.$emit("getValue", [text]);
        return;
      }
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
  width: 40px;
  height: 40px;
  padding: 10px;
}
.type-text {
  font-size: 8px;
  display: inline-block;
}
</style>
