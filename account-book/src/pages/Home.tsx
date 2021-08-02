<template>
  <section class="home-container">
    <nav-bar title="首页">
      <template #left>
        <van-icon name="setting-o" size="18" @click="onSettingClick"/>
      </template>
      <van-icon name="add-o" size="18" @click="onAddAcctClick" />
    </nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="onListRefresh">
      <van-list finished-text="没有更多了">
        <van-swipe-cell>
          <van-cell
            :border="false"
            title="总账户"
            :value="sum(0)"
            @click="onAccountDetailClick(0)"
          />
        </van-swipe-cell>
        <van-swipe-cell v-for="acct in accounts" :key="acct.id">
          <van-cell
            :border="false"
            :title="acct.name"
            :value="sum(acct.includeTypes)"
            @click="onAccountDetailClick(acct.id)"
          />
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="onItemDelete(acct.id)"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
    <footer class="footer">
      <van-button round type="info" @click="addRecord" icon="edit"
        >记一笔</van-button
      >
    </footer>
  </section>
</template>
<script>
import router from "../router";
import { mapState } from "vuex";
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      refreshing: false,
    };
  },
  computed: mapState({
    accounts: (state) => state.accounts,
    records: (state) => state.records,
  }),
  methods: {
    sum(includeTypes) {
      let records;
      if (includeTypes === 0) {
        records = this.records;
      } else {
        records = this.records.filter((i) => includeTypes.indexOf(i.type) > -1);
      }

      return records.reduce((a, b) => {
        return (a +=
          b.inOrOut === "out" ? 0 - parseInt(b.amount) : parseInt(b.amount));
      }, 0);
    },
    onListRefresh() {
      this.$store.dispatch("getData");
      this.refreshing = false;
    },
    onSettingClick() {
      router.push(`/settings`);
    },
    onAccountDetailClick(id) {
      router.push(`/account-detail/${id}`);
    },
    onAddAcctClick() {
      router.push("/add-account");
    },
    onItemDelete(id) {
      this.$store.dispatch("deleteAcct", id);
    },
    addRecord() {
      router.push("/add-record");
    },
  },
};
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
}
.van-swipe-cell {
  margin: 8px 0;
  border-bottom: #e8e8e8 1px solid;
}
.footer {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
