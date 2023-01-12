var formSearch = document.querySelector('.poke-submit');
var pokeInput = document.querySelector('.poke-input');
var searchBox = document.querySelector('.searchbox-container');
var resultsPage = document.querySelector('.result-container');
var viewPage = document.querySelectorAll('.view');
var ul = document.querySelector('.results-list');

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
  }
  if (event.target.matches('.nav-home')) {
    for (let i = 0; i < viewPage.length; i++) {
      if (resultsPage.getAttribute('data-view') === viewPage[i].getAttribute('data-view')) {
        viewPage[i].classList.add('hidden');
      } else {
        viewPage[i].classList.remove('hidden');
      }
    }
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
    ul.textContent = '';

    var li = document.createElement('li');
    li.setAttribute('class', 'column-full');

    var img = document.createElement('img');
    img.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + xhr.response.id + '.png');
    img.setAttribute('class', 'image');

    var name = document.createElement('p');
    name.textContent = xhr.response.name.toUpperCase();
    name.setAttribute('class', 'name');

    ul.appendChild(li);
    li.appendChild(name);
    li.appendChild(img);

  });
  xhr.send();
}
