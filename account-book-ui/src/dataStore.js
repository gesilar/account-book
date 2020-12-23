const openIndexDB = async () => {
  return new Promise(function (resolve) {
    const request = indexedDB.open("acct_book_db");
    request.onerror = function () {
      // reject(`Why didn"t you allow my web app to use IndexedDB?!`);
    };
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("accounts", { autoIncrement: true });
      db.createObjectStore("records", { autoIncrement: true });
      db.createObjectStore("types", { keyPath: "text" });
    };
  })
}

const closeDb = (db) => {
  if (db) {
    db.close();
  }
}

const getStoreData = (transaction) => (storeName) => {
  return new Promise(function (resolve) {
    let dataList = [];
    transaction.objectStore(storeName).openCursor().onsuccess = function (e) {
      const cursor = e.target.result;
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

const addStoreDatas = (transaction) => (storeName, dataList) => {
  return new Promise(function (resolve) {
    const os = transaction.objectStore(storeName)
    transaction.objectStore(storeName).clear().onsuccess = function () {
      dataList.forEach((i) => {
        os.add(i);
      })
      resolve(true);
    }
  });
}

const getAcctAndRecords = async () => {
  const db = await openIndexDB();
  const transaction = db.transaction(["accounts", "records", "types"], "readwrite");
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

const addAcct = async (acct) => {
  const db = await openIndexDB();
  const transaction = db.transaction(["accounts"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("accounts").add(acct).onsuccess = function (event) {
      resolve(event.target.result);
      closeDb(db);
    }
  });
}

const deleteAcct = async (id) => {
  const db = await openIndexDB();
  const transaction = db.transaction(["accounts"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("accounts").delete(id).onsuccess = function () {
      resolve(true);
      closeDb(db);
    }
  });
}

const addRecord = async (record) => {
  const db = await openIndexDB();
  const transaction = db.transaction(["records"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("records").add(record).onsuccess = function (event) {
      resolve(event.target.result);
      closeDb(db);
    }
  });
}
const deleteRecord = async (id) => {
  const db = await openIndexDB();
  const transaction = db.transaction(["records"], "readwrite");
  return new Promise(function (resolve) {
    transaction.objectStore("records").delete(id).onsuccess = function () {
      resolve(true);
      closeDb(db);
    }
  });
}
const addType = async (type) => {
  const db = await openIndexDB();
  const transaction = db.transaction(["types"], "readwrite");
  return new Promise(function () {
    transaction.objectStore("types").add(type).onsuccess = function () {
      closeDb(db);
    }
  });
}

const writeFile = async (data) => {
  const type = window.PERSISTENT;//eslint-disable-line
  if (!window.requestFileSystem) {
    console.log("plugin not exists");
    return;
  }
  return new Promise(function () {
    window.requestFileSystem(type, 0, successCallback, errorCallback)
    function successCallback(fs) {
      fs.root.getFile(`account-data.txt`, { create: true, replace: true }, function (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function () {
            alert("备份完成");
          };

          fileWriter.onerror = function (e) {
            alert('备份出错: ' + e.toString());
          };

          fileWriter.write(JSON.stringify(data));
        }, errorCallback);

      }, errorCallback);
    }

    function errorCallback(error) {
      alert("ERROR: " + error.code)
    }
  })
}

const restoreIntoIndexDB = async (data) => {
  const {accounts, records, types} = data;
  alert(`恢复账户：${accounts.length}条， 记录：${records.length}条， 类型：${types.length}条`);
  const db = await openIndexDB();
  const transaction = db.transaction(["accounts", "records", "types"], "readwrite");
  const addData = addStoreDatas(transaction);
  try {
    await Promise.all([addData("accounts", accounts), addData("records", records), addData("types", types)]);
  } catch(e) {
    console.log(e);
  }
  closeDb(db);
  return data;
}

const restore = async () => {
  const type = window.PERSISTENT;//eslint-disable-line
    const size = 5 * 1024 * 1024;
  if (!window.requestFileSystem) {
    console.log("plugin not exists");
    return;
  }
  return new Promise(function (resolve) {
    window.requestFileSystem(type, size, successCallback, errorCallback)
    function successCallback(fs) {
      fs.root.getFile('account-data.txt', {}, function (fileEntry) {
        fileEntry.file(function (file) {
          const reader = new FileReader();
          reader.onloadend = async function () {
            await restoreIntoIndexDB(JSON.parse(this.result));
            resolve(JSON.parse(this.result));
          };
          reader.readAsText(file);
        }, errorCallback);
      }, errorCallback);
    }
    function errorCallback(error) {
      alert("ERROR: " + error.code);
    }
  })
}

export default {
  getAcctAndRecords,
  addAcct,
  deleteAcct,
  addRecord,
  deleteRecord,
  addType,
  writeFile,
  restore
}
