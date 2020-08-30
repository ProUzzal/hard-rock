document.querySelector("#search-button").addEventListener("click", function () {
  const inputText = document.querySelector("#input-text").value;
  loadFetch(inputText);
  document.querySelector("#input-text").value = "";
});

function loadFetch(inputValue) {
  fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
    .then((res) => res.json())
    .then((allData) => {
      let arrData = allData.data;
      arrData = arrData.slice(0, 10);
      document.querySelector("#song-details").innerHTML = "";
      for (let i = 0; i < arrData.length; i++) {
        const element = arrData[i];
        const title = element.album.title;
        const name = element.artist.name;
        const parent = document.querySelector("#song-details");
        const para = document.createElement("p");
        para.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${title}</h3>
                                    <p class="author lead">Album by <span>${name}</span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                        <button class="btn btn-success">Get Lyrics</button>
                                </div>
                            </div>`;
        parent.appendChild(para);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
