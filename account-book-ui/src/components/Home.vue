<template>
  <section class="home-container">
    <nav-bar title="首页">
      <template #left>
        <van-icon name="setting" size="18" @click="onSettingClick"/>
      </template>
      <van-icon name="add-o" size="18" @click="onAddAcctClick" />
    </nav-bar>
    <van-list finished-text="没有更多了" onLoad="">
      <van-swipe-cell>
        <van-cell :border="false" title="总账户" value="内容" @click="onAccountDetailClick(0)"/>
      </van-swipe-cell>
      <van-swipe-cell v-for="acct in accounts" :key="acct.id" >
        <van-cell :border="false" :title="acct.name" value="内容" @click="onAccountDetailClick(acct.id)"/>
        <template #right>
          <van-button square type="danger" text="删除" @click="onItemDelete(acct.id)"/>
        </template>
      </van-swipe-cell>
    </van-list>
    <footer class="footer">
      <van-button round type="info" @click="addRecord" icon="edit">记一笔</van-button>
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
    return {};
  },
  computed: mapState({
    accounts: (state) => state.accounts,
  }),
  methods: {
    onListLoad() {
      this.$store.dispatch("getData");
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
.footer {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
