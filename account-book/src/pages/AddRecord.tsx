<template>
  <section>
    <nav-bar title="添加记录" back/>
    <van-tabs v-model="active">
      <template v-for="tab in [`支出`, `收入` ]" >
        <van-tab :title="tab" :key="tab"></van-tab>
      </template>
    </van-tabs>
    <van-field
      readonly
      clickable
      :value="amount"
      label="金额"
      maxlength="5"
    />
    <type-selector v-model="selected"></type-selector>
    <van-field
      clickable
      v-model="remark"
      label="备注"
    />
    <van-number-keyboard
      show
      v-model="amount"
      close-button-text="完成"
      @blur="show = false"
      @close="onClose"
    />
  </section>
</template>
<script>
import router from '../router';
import NavBar from "./NavBar.vue";
import TypeSelector from './TypeSelector.vue';
export default {
  components: {
    NavBar,
    TypeSelector,
  },
  data() {
    return {
      show: false,
      active: 0,
      amount: "",
      date: new Date(),
      remark: "",
      selected: [],
    };
  },
  methods: {
    validate(payload) {
      const { amount, type} = payload;
      if (amount === "" || !Number.isInteger(parseInt(amount))) {
        return false;
      }
      if (!type || type.length === 0) {
        return false;
      }
      return true;
    },
    onClose() {
      const { amount, date, remark, selected, active} = this;
      const payload = { amount, date, remark, type: selected[0], inOrOut: active === 0 ? "out" : "in"};
      if (this.validate(payload)) {
        this.$store.dispatch("addRecord", payload);
        router.back();
      }
    }
  },
};
</script>
