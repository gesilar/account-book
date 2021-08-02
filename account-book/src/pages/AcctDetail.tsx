<template>
  <section>
    <nav-bar :title="accountName" back> </nav-bar>
    <van-list>
      <van-swipe-cell v-for="r in records" :key="r.id">
          <van-cell 
          :title="r.type"
          :value="getAmountLabel(r)" 
          size="large" 
          :label="`${(r.remark || r.type) + ' : '}${getDate(r.date)}`"
          :icon="typeTextIconMap[r.type]"/>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="onItemDelete(r.id)"/>
          </template>
      </van-swipe-cell>
    </van-list>
  </section>
</template>
<script>
import NavBar from "./NavBar.vue";
export default {
  props: {
    id: String
  },
  components: {
    NavBar
  },
  computed: {
    records: function(){
      if(this.id === "0") {
        return this.$store.state.records;
      }
      const acct = this.$store.state.accounts.find((i) => i.id === parseInt(this.id));
      return this.$store.state.records.filter(i => acct.includeTypes.indexOf(i.type) > -1);
    },
    accountName: function() {
      if(this.id === "0") {
        return "总账户"
      }
      const acct = this.$store.state.accounts.find((i) => i.id === parseInt(this.id));
      return acct.name;
    },
    typeTextIconMap: function() {
      const m = {};
      this.$store.state.types.forEach(i => {
        m[i.text] = i.icon;
      })
      return m;
    }
  },
  created() {
    console.log(this.id);
  },
  methods: {
    onItemDelete(id) {
      this.$store.dispatch("deleteRecord",id);
    },
    getAmountLabel(record) {
      if (record.inOrOut === "out")  {
        return `-${record.amount}`;
      } else {
        return ``+ record.amount;
      }
    },
    getDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
  }
};
</script>
<style scoped>
.van-swipe-cell {
  margin: 8px 0;
}
.delete-button {
  height: 100%;
}

</style>
