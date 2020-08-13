const base_url = "https://api.football-data.org/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {

  const myHeaders = new Headers({
    'X-Auth-Token': 'f401a6a154394f318de1731b40d23d0c'
  });  

  if ("caches" in window) {
    caches.match(base_url + "/v2/competitions/2001/standings?standingType=TOTAL").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let articlesHTML = "";
          let group_team = "";
          data.standings.forEach(function(article) {
            article.table.forEach(function(d1) {
              console.log(article);
              group_team += `
                    <div class="card">
                      <a href="./article.html?id=${d1.team.id}">
                        <div class="card-content">
                          <span class="card-title truncate">
                            <img class="materialboxed" width="30" src="${d1.team.crestUrl}">
                            ${d1.team.name}
                          </span>
                        </div>
                      </a>
                    </div>
                  `;
            });             
            articlesHTML += `
                  <div class="card">
                    <div class="card-content">
                      <span class="card-title truncate">${article.group}</span>
                      <span class="card-title truncate">${group_team}</span>
                    </div>
                  </div>
                `;
            group_team = "";                
          });

          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + "/v2/competitions/2001/standings?standingType=TOTAL", {headers: myHeaders})
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      let group_team = "";
      data.standings.forEach(function(article) {
        article.table.forEach(function(d1) {
          group_team += `
                <div class="card">
                  <a href="./article.html?id=${d1.team.id}">
                    <div class="card-content">
                      <span class="card-title truncate">
                        <img class="materialboxed" height="30" src="${d1.team.crestUrl}">
                        ${d1.team.name}
                      </span>
                    </div>                  
                  </a>
                </div>
              `;
        });          
        articlesHTML += `
              <div class="card">
                <div class="card-content">
                  <span class="card-title truncate">${article.group}</span>
                  <span class="card-title truncate">${group_team}</span>
                </div>
              </div>
            `;
        group_team = "";         
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);

}

//----------------------------------------------------------------------------------------
function getArticlesp2() {
  if ("caches" in window) {
    caches.match(base_url + "v2/competitions/").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let articlesHTML = "";
          data.competitions.forEach(function(article) {      
            articlesHTML += `
                  <div class="card">
                    <div class="card-content">
                      <span class="card-title truncate">Club Name : ${article.name}</span>
                      <span class="card-title truncate">Area : ${article.area.name}</span>
                    </div>
                  </div>
                `;
          });

          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("idjadwal").innerHTML = articlesHTML;
        });
      }
    });
  }

  const myHeaders = new Headers({
    'X-Auth-Token': 'f401a6a154394f318de1731b40d23d0c'
  });

  fetch(base_url + "v2/competitions/", {headers: myHeaders})
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      data.competitions.forEach(function(article) {        
        articlesHTML += `
              <div class="card">
                <div class="card-content">
                  <span class="card-title truncate">Club Name : ${article.name}</span>
                  <span class="card-title truncate">Area : ${article.area.name}</span>
                </div>
              </div>
            `;      
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("idjadwal").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "v2/teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let articleHTML = `
              <div class="card">
                <div class="card-content">
                  <span class="card-title"><img class="materialboxed" width="50" src="${data.crestUrl}"> Club Name : ${data.name}</span>
                  <span class="card-title">Area : ${data.area.name}</span>
                  <span class="card-title">Aktif Competition : ${data.activeCompetitions[0].name}</span>                  
                </div>
              </div>
            `;    
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    const myHeaders = new Headers({
      'X-Auth-Token': 'f401a6a154394f318de1731b40d23d0c'
    });

    fetch(base_url + "v2/teams/" + idParam, {headers: myHeaders})
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let articleHTML = `
              <div class="card">
                <div class="card-content">
                  <span class="card-title"><img class="materialboxed" width="50" src="${data.crestUrl}"> Name Club : ${data.name}</span>
                  <span class="card-title">Area : ${data.area.name}</span>
                  <span class="card-title">Aktif Competition : ${data.activeCompetitions[0].name}</span>
                </div>
              </div>
        `;
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedArticles() {
  const dominsert = document.getElementById("body-content");
  dominsert.innerHTML = "Data tidak ada";
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    articles.forEach(function(article) {
      articlesHTML += `
                
                  <div class="card">    
                    <a href="./article.html?id=${article.id}&saved=true">
                      <div class="card-content">
                        <span class="card-title">Name Club : ${article.name}</span>
                      </div>
                    </a>
                    <button class="waves-effect waves-light btn red" onclick="deletesaved(${article.id})">delete</button>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    dominsert.innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  console.log(idParam);

  getById(idParam).then(function(article) {
    console.log(article+"ddddddd");
    let articleHTML = '';
    articleHTML += `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
          </div>
          <div class="card-content">
            #saved page
            <hr>
            <span class="card-title">Name Club : ${article.name}</span>
            <span class="card-title">Area : ${article.area.name}</span>
            <span class="card-title">Aktif Competition : ${article.activeCompetitions[0].name}</span>   
          </div>
        </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

