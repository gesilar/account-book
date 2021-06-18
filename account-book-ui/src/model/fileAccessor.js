export const writeFile = (fileName, data) => {
  const type = window.PERSISTENT;//eslint-disable-line
  if (!window.requestFileSystem) {
    console.log("plugin not exists");
    return;
  }
  return new Promise(function (resolve, reject) {
    function errorCallback(error) {
      reject(error)
    }

    window.requestFileSystem(type, 0,
      function (fs) {
        fs.root.getFile(fileName, { create: true, replace: true }, function (fileEntry) {
          fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function () {
              resolve(true);
            };

            fileWriter.onerror = function (e) {
              errorCallback(e);
            };
            fileWriter.write(JSON.stringify(data));
          }, errorCallback);
        }, errorCallback);
      },
      errorCallback
    )
  });
}

export const readFile = (fileName) => {
  const type = window.PERSISTENT;//eslint-disable-line
  const size = 5 * 1024 * 1024;//eslint-disable-line
  if (!window.requestFileSystem) {
    return Promise.resolve(false);
  } else {
    return new Promise(function (resolve) {
      window.requestFileSystem(type, size, successCallback, errorCallback)
      function successCallback(fs) {
        fs.root.getFile(fileName, {}, function (fileEntry) {
          fileEntry.file(function (file) {
            const reader = new FileReader();
            reader.onloadend = async function () {
              resolve(this.result);
            };
            reader.readAsText(file);
          }, errorCallback);
        }, errorCallback);
      }
      function errorCallback(error) {
        alert("ERROR: " + error.code);
      }
    });
  }
}

