
// ambil elemen search btn
const searchBtn = document.querySelector('.search-button');

searchBtn.addEventListener('click', async function () {
  const searchInput = document.querySelector('.input-keyword');
  const movies = await getMovies(searchInput.value);

  updateUI(movies)
})

function getMovies(searchMovie) {
  return fetch('http://www.omdbapi.com/?apikey=ac850f50&s=' + searchMovie)
    .then(response => response.json())
    .then(response => response.Search);
}

function updateUI(movies) {
  const moviePlace = document.querySelector(".movie-place");
  let cards = ``;
  movies.forEach(function (el) {
    cards += showCards(el)
  });
  moviePlace.innerHTML = cards;
}

document.addEventListener('click', async function (e) {
  if (e.target.className == "btn btn-primary show-btn") {
    let imdbId = e.target.dataset.imdb;
    let details = await getDetailMovies(imdbId);
    uiDetailsMovie(details);
  }
});

function getDetailMovies(idMovie) {
  return fetch('http://www.omdbapi.com/?apikey=ac850f50&i=' + idMovie)
    .then(response => response.json())
    .then(response => response);
}

function uiDetailsMovie(details) {
  const tempatModal = document.querySelector(".modal-body");
  movieDetails(details);
  tempatModal.innerHTML = movieDetails(details);
}




// user interface

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