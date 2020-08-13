var dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
});

function saveForLater(article) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");
      store.put(article);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
      M.toast({html: 'Artikel berhasil di simpan.'})
    });    
}

function deletesaved(article) {
  var x = confirm("Are you sure you want to delete?");
  if (x){
    dbPromised
      .then(function(db) {
        var tx = db.transaction('articles', 'readwrite');
        var store = tx.objectStore('articles');
        store.delete(article);
        return tx.complete;
      }).then(function() {
        M.toast({html: 'Item deleted'})
        window.location.reload();
      });    
    return true;
  }
  else{
    return false;
  }
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
      })
      .then(function(articles) {
        resolve(articles);
        console.log(articles);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.get(parseInt(id));
      })
      .then(function(article) {
        resolve(article);
      });
  });
}
