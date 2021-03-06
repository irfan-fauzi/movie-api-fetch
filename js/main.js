
// ambil elemen search btn
const searchBtn = document.querySelector('.search-button');
// textfiled film yang dicari
const searchInput = document.querySelector('.input-keyword');
// tempat card film diletakan
const moviePlace = document.querySelector(".movie-place");


searchBtn.addEventListener("click", function () {

  // dalam method fetch(url)
  fetch('http://www.omdbapi.com/?apikey=ac850f50&s=' + searchInput.value)
    .then(response => response.json())
    .then(function (response) {
      let arrMovies = response.Search;
      let cards = ``;

      arrMovies.forEach(function (el) {
        cards += showCards(el)
      });
      moviePlace.innerHTML = cards;
      // detail
      const showBtn = document.querySelectorAll('.show-btn');
      showBtn.forEach(function (btn) {

        btn.addEventListener("click", function () {
          // tempat modal

          const tempatModal = document.querySelector(".modal-body");
          let idMovie = this.dataset.imdb;
          fetch('http://www.omdbapi.com/?apikey=ac850f50&i=' + idMovie)
            .then(response => response.json())
            .then(response => {
              movieDetails(response);
              tempatModal.innerHTML = movieDetails(response);
            });
        });
      });

    });

});


// modal

function showCards(el) {
  return `<div class="col-md-4 my-5">
  <div class="card">
    <img class="card-img-top" src="${el.Poster}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${el.Title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${el.Year}</h6>
      <a href="#" class="btn btn-primary show-btn" data-toggle="modal" data-target="#detailMovie" data-imdb="${el.imdbID}">Show Details</a>
    </div>
  </div>
</div>`;
}

function movieDetails(hasil) {
  return ` <div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img
        src="${hasil.Poster}"
        alt="image" class="img-fluid">
    </div>
    <div class="col-md">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Judul :</strong> ${hasil.Title}</li>
        <li class="list-group-item"><strong>Actors : </strong> ${hasil.Actors} </li>
        <li class="list-group-item"><strong>Director : </strong> ${hasil.Director} </li>
        <li class="list-group-item"><strong> Writters : </strong> ${hasil.Writer}</li>
        <li class="list-group-item"><strong> Plot : </strong> ${hasil.Plot}</li>
        <li class="list-group-item"><strong> Rating IMDB : </strong> ${hasil.imdbRating}</li>
      </ul>
    </div>
  </div>
</div>`;
}