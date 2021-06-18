class IndexDBProxy {
  constructor(db) {
    this.db = db;
  }
  static createIndexDB = async (dbName, version, onupgradeneeded) => {
    return new Promise((resolve) => {
      const request = indexedDB.open(dbName, version);
      request.onerror = function () {
        // reject(`Why didn"t you allow my web app to use IndexedDB?!`);
      };
      request.onsuccess = function () {
        resolve(true);
      };
      request.onupgradeneeded = onupgradeneeded;
    });
  }

  static openIndexDB = async (dbName, version) => {
    return new Promise((resolve) =>  {
      const request = indexedDB.open(dbName, version);
      request.onerror = function () {
        // reject(`Why didn"t you allow my web app to use IndexedDB?!`);
      };
      request.onsuccess = function (event) {
        resolve(new IndexDBProxy(event.target.result));
      };
    })
  }

  close = async () => {
    this.db.close();
  }

  getData = async (storeNameList) => {
    const transaction = this.db.transaction(storeNameList, "readonly");
    const getStoreData = async (storeName) => {
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
      })
    };
    return Promise.all(storeNameList.map((storeName) => {
      return getStoreData(storeName);
    }))
  }

  addOne = async (storeName, data) => {
    const transaction = this.db.transaction([storeName], "readwrite");
    return new Promise((resolve) => {
      transaction.objectStore(storeName).add(data).onsuccess = function (event) {
        resolve(event.target.result);
      }
    });
  }

  addDatas = async (storeName, dataList) => {
    const transaction = this.db.transaction([storeName], "readwrite");
    return new Promise((resolve) => {
      const os = transaction.objectStore(storeName)
      transaction.objectStore(storeName).clear().onsuccess = function () {
        dataList && dataList.forEach((i) => {
          os.add(i);
        })
        resolve(true);
      }
    });
  }
  deleteById = async (storeName, id) => {
    const transaction = this.db.transaction([storeName], "readwrite");
    return new Promise((resolve) => {
      transaction.objectStore(storeName).delete(id).onsuccess = function () {
        resolve(true);
      }
    });
  }
}

export default IndexDBProxy;
