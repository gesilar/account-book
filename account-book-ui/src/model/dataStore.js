import { restoreData } from "../../data/restoreFile.js";
import IndexDBProxy from "./indexDBProxy";
import * as fileAccessor from "./fileAccessor";

const createAcctBookDB = () => {
  return IndexDBProxy.createIndexDB("acct_book_db", 1, (event) => {
    const db = event.target.result;
    if (event.oldVersion < 1) {
      db.createObjectStore("accounts", { autoIncrement: true });
      db.createObjectStore("records", { autoIncrement: true });
      db.createObjectStore("types", { autoIncrement: true });
    }
  })
}
const openAcctBookDB = async () => {
  return IndexDBProxy.openIndexDB("acct_book_db", 1);
}

const getAcctAndRecords = async () => {
  const db = await openAcctBookDB();
  const [accounts, records, types] = await db.getData(["accounts", "records", "types"]);
  db.close();
  return {
    accounts,
    records,
    types
  }
}

const addData = async (storeName, data) => {
  let result;
  const db = await openAcctBookDB();
  try {
    result = await db.addOne(storeName, data);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    db.close();
  }
  return result;
}

const deleteById = async (storeName, id) => {
  let result;
  const db = await openAcctBookDB();
  try {
    result = await db.deleteById(storeName, id);
  } catch (e) {
    console.error(e);
  } finally {
    db.close();
  }
  return result;
}

const addAcct = (acct) => {
  return addData("accounts", acct);
}

const deleteAcct = (id) => {
  return deleteById("accounts", id);
}

const addRecord = (record) => {
  return addData("records", record);
}
const deleteRecord = (id) => {
  return deleteById("records", id);
}


const addTypes = (type) => {
  return addData("types", type);
}
const deleteTypes = (id) => {
  return deleteById("types", id);
}

const backupIntoFile = async (data) => {
  try {
    return fileAccessor.writeFile(`account-data.txt`, data);
  } catch(e) {
    alert(e.message);
  }
}

const restoreIntoIndexDB = async (data) => {
  const { accounts = [], records = [], types = [] } = data;
  alert(`恢复账户：${accounts.length}条， 记录：${records.length}条, 类型： ${types.length}`);
  const db = await openAcctBookDB();
  try {
    await Promise.all([
      db.addDatas("accounts", accounts),
      db.addDatas("records", records),
      db.addDatas("types", types)
    ]);
  } catch (e) {
    console.log(e);
    alert(e.message);
  } finally {
    db.close();
  }
  return data;
}


const restoreFromFile = async function(){
  let fileData;
  if (!window.requestFileSystem) {
    fileData = JSON.stringify(restoreData());
  } else {
    fileData = fileAccessor.readFile(`account-data.txt`)
  }
  try {
    const result = await restoreIntoIndexDB(JSON.parse(fileData));
    return result;
  } catch (e) {
    return {
      accounts: [],
      records: [],
      types: []
    }
  }
}


export default {
  createAcctBookDB,
  getAcctAndRecords,
  addAcct,
  deleteAcct,
  addRecord,
  deleteRecord,
  addTypes,
  deleteTypes,
  backupIntoFile,
  restoreFromFile
}
