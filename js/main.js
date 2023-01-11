var formSearch = document.querySelector('.poke-submit');
var pokeInput = document.querySelector('.poke-input');
var searchBox = document.querySelector('.searchbox-container');
var resultsPage = document.querySelector('.result-container');

var viewPage = document.querySelectorAll('.view');

formSearch.addEventListener('submit', handleSubmit);
window.addEventListener('click', handleViewSwap);

function handleViewSwap(event) {
  if (event.target.matches('.button-search')) {
    for (let i = 0; i < viewPage.length; i++) {
      if (searchBox.getAttribute('data-view') === viewPage[i].getAttribute('data-view')) {
        viewPage[i].classList.add('hidden');
      } else {
        viewPage[i].classList.remove('hidden');
      }
    }
    data.view = 'results-page';
  }
  if (event.target.matches('.nav-home')) {
    for (let i = 0; i < viewPage.length; i++) {
      if (resultsPage.getAttribute('data-view') === viewPage[i].getAttribute('data-view')) {
        viewPage[i].classList.add('hidden');
      } else {
        viewPage[i].classList.remove('hidden');
      }
    }
    data.view = 'home-page';
  }
}

function handleSubmit(event) {
  event.preventDefault();
  pokeName(pokeInput.value);
  formSearch.reset();
}

function pokeName(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response.name);
    console.log(xhr.response);
  });
  xhr.send();
}
