<template>
  <section>
    <section class="type-edit-container">
      <a class="type-edit-btn" @click="onEditClick">edit</a>
    </section>
    <ul class="type-selector">
      <li v-for="tItem in types" :key="tItem.text" class="type-option">
        <van-icon
          size="20px" 
          :name="tItem.icon" 
          @click="onTypeSelectClick(tItem.text)" 
          :color="selected.indexOf(tItem.text) > -1 ? `red` : undefined"
          :badge="editMode && tItem.id !== undefined ? '-' : ''"
          ></van-icon>
        <a class="type-text">{{ tItem.text }}</a>
      </li>
      <li v-show="editMode" class="type-option" >
        <van-icon size="20px" name="add-o" key="add" @click="onTypeAddClick()"></van-icon>
        <a class="type-text">新增</a>
      </li>
    </ul>
  </section>
</template>
<script>
import router from "../router";
export default {
  model: {
    prop: "selected",
    event: "getValue"
  },
  props: {
    selected: Array,
    multi: Boolean
  },
  computed: {
    types: function() {
      return this.$store.state.types;
    }
  },
  data() {
    return {
      editMode: false
    }
  },
  methods: {
    onTypeSelectClick(text) {
      if (this.editMode) {
        this.$store.dispatch("deleteTypes", text)
        return;
      }
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
    onTypeAddClick() {
      router.push("/add-type");
    },
    onEditClick() {
      this.editMode = !this.editMode;
    }
  },
};
</script>

<style scoped>
.type-edit-container {
  display: flex;
  justify-content: flex-end;
}
.type-edit-btn {
  display: block;
  height: 20px;
  padding-top: 10px;
  padding-right: 30px;
}
.type-selector {
  display: flex;
  padding: 16px;
  flex-wrap: wrap;
}
.type-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35px;
  height: 35px;
  padding: 10px;
}
.type-text {
  font-size: 8px;
  display: inline-block;
}
</style>
