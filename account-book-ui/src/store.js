import Vue from "vue";
import Vuex from "vuex";
import dataStore from "./model/dataStore";
Vue.use(Vuex);
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
    updateRecords(state, payload) {
      state.records = payload.sort((a, b) => {return +new Date(b.date) - (+new Date(a.date))});
    },
    updateTypes(state, payload) {
      state.types = payload;
    }
  },
  actions: {
    async getData() {
      const data = await dataStore.getAcctAndRecords();
      this.commit("updateAccts", data.accounts);
      this.commit("updateRecords", data.records);
      this.commit("updateTypes", data.types);
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
    async addTypes(context, payload) {
      const id = await dataStore.addTypes(payload);
      if (id) {
        payload.id = id;
        const newTypes = [...context.state.types, payload];
        context.commit("updateTypes", newTypes);
      }
    },
    async deleteTypes(context, text) {
      try {
        const result = await dataStore.deleteTypes(text);
        if (result) {
          const index = context.state.types.findIndex((i) => i.text === text);
          context.state.types.splice(index, 1);
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
    },
    async backup(context) {
      try {
        const { 
          accounts,
          records,
          types
        } = context.state;
        dataStore.writeFile({
          accounts,
          records,
          types
        });
      } catch(e) {
        console.log(e);
      }
    },
    async restore() {
      try {
        const data = await dataStore.restore();
        this.commit("updateAccts", data.accounts);
        this.commit("updateRecords", data.records);
        this.commit("updateTypes", data.types);
      } catch(e) {
        console.log(e);
      }
    }
  },
})

export default store;
