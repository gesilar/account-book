<template>
  <section>
    <ul class="type-selector">
      <li v-for="iItem in icons" :key="iItem" class="type-option">
        <van-icon size="20px" :name="iItem" @click="onTypeSelectClick(iItem)" :color="selected === iItem ? `red` : undefined"></van-icon>
      </li>
    </ul>
  </section>
</template>
<script>
import {icons} from "../constants/index";
export default {
  model: {
    prop: "selected",
    event: "getValue"
  },
  props: {
    selected: String
  },
  data() {
    return {
      icons
    }
  },
  methods: {
    onTypeSelectClick(iconName) {
      this.selected = iconName;
      this.$emit("getValue", iconName);
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
