var openIndexDB = async () => {
  return new Promise(function (resolve) {
    const request = indexedDB.open("acct_book_db");
    request.onerror = function () {
      // reject(`Why didn"t you allow my web app to use IndexedDB?!`);
    };
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
    request.onupgradeneeded = function (event) {
      var db = event.target.result;
      db.createObjectStore("accounts", {autoIncrement:true});
      db.createObjectStore("records", {autoIncrement:true});
      db.createObjectStore("types", { keyPath: "text" });
    };
  })
}

var closeDb = (db) => {
  if (db) {
    db.close();
  }
}

var getStoreData = (transaction) => (storeName) => {
  return new Promise(function (resolve) {
    let dataList = [];
    transaction.objectStore(storeName).openCursor().onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {//eslint-disable-line
        const d = cursor.value;
        d.id = cursor.key;
        dataList[dataList.length] = d;
        cursor.continue();
      } else {
        resolve(dataList);
      }
    }
  });
}

var getAcctAndRecords = async () => {
  const db = await openIndexDB();
  var transaction = db.transaction(["accounts", "records", "types"], "readwrite");
  transaction.oncomplete = function () {
    // doing something
  };
  transaction.onerror = function () {
    // 不要忘记错误处理！
  };
  const getData = getStoreData(transaction);
  const [accounts, records, types] = await Promise.all([getData("accounts"), getData("records"), getData("types")]);
  closeDb(db);
  return {
    accounts,
    records,
    types
  }
}

var addAcct = async (acct) => {
  const db = await openIndexDB();
  var transaction = db.transaction(["accounts"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("accounts").add(acct).onsuccess = function (event) {
      resolve(event.target.result);
      closeDb(db);
    }
  });
}

var deleteAcct = async (id) => {
  const db = await openIndexDB();
  var transaction = db.transaction(["accounts"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("accounts").delete(id).onsuccess = function () {
      resolve(true);
      closeDb(db);
    }
  });
}

var addRecord = async (record) => {
  const db = await openIndexDB();
  var transaction = db.transaction(["records"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("records").add(record).onsuccess = function (event) {
      resolve(event.target.result);
      closeDb(db);
    }
  });
}
var deleteRecord = async (id) => {
  const db = await openIndexDB();
  var transaction = db.transaction(["records"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("records").delete(id).onsuccess = function () {
      resolve(true);
      closeDb(db);
    }
  });
}
var addType = async (type) => {
  const db = await openIndexDB();
  var transaction = db.transaction(["types"], "readwrite");
  return new Promise(function () {
    transaction.objectStore("types").add(type).onsuccess = function () {
      closeDb(db);
    }
  });
}


export default {
  getAcctAndRecords,
  addAcct,
  deleteAcct,
  addRecord,
  deleteRecord,
  addType
}
