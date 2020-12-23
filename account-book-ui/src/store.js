import Vue from "vue";
import Vuex from "vuex";
import dataStore from "./dataStore";
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    accounts: [],
    records: [],
    types: []
  },
  mutations: {
    updateAccts(state, payload) {
      state.accounts = payload;
    },
    updateTypes(state, payload) {
      state.types = payload;
    },
    updateRecords(state, payload) {
      state.records = payload;
    }
  },
  actions: {
    async getData() {
      const data = await dataStore.getAcctAndRecords();
      this.commit("updateAccts", data.accounts);
      this.commit("updateTypes", data.types);
      this.commit("updateRecords", data.records);
    },
    async addAcct(context, payload) {
      const id = await dataStore.addAcct(payload);
      if (id) {
        payload.id = id;
        const newAccts = [...context.state.accounts, payload];
        context.commit("updateAccts", newAccts);
      }
    },
    async deleteAcct(context, id) {
      try {
        const result = await dataStore.deleteAcct(id);
        if (result) {
          const index = context.state.accounts.findIndex((i) => i.id === id);
          context.state.accounts.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addRecord(context, payload) {
      const id = await dataStore.addRecord(payload);
      if (id) {
        payload.id = id;
        const newRecords = [...context.state.records, payload]
        this.commit("updateRecords", newRecords);
      }
    },
    async deleteRecord(context, id) {
      try {
        const result = await dataStore.deleteRecord(id);
        if (result) {
          const index = context.state.records.findIndex((i) => i.id === id);
          context.state.records.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
})

export default store;
