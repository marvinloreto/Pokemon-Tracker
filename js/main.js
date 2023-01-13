var formSearch = document.querySelector('.poke-submit');
var pokeInput = document.querySelector('.poke-input');
var searchPage = document.querySelector('.searchbox-container');
var resultsPage = document.querySelector('.result-container');
var viewPage = document.querySelectorAll('.view');
var ul = document.querySelector('.results-list');
var detailsPage = document.querySelector('.details-container');
var buttonSearch = document.querySelector('.button-search');

formSearch.addEventListener('submit', handleSubmit);

buttonSearch.addEventListener('click', handleSearch);
function handleSearch(event) {
  for (let i = 0; i < viewPage.length; i++) {
    if (searchPage.getAttribute('data-view') === viewPage[i].getAttribute('data-view')) {
      viewPage[i].classList.add('hidden');
      detailsPage.classList.add('hidden');
    } else {
      viewPage[i].classList.remove('hidden');
    }
  }
  data.view = 'results-page';
}

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
        detailsPage.classList.add('hidden');
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
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase());
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var character = xhr.response;
    ul.textContent = '';

    ul.appendChild(getCharacterList(character));
  });
  xhr.send();
}

function getCharacterList(character) {
  var li = document.createElement('li');
  li.setAttribute('class', 'column-full');
  li.setAttribute('data-character-id', character.id);

  var img = document.createElement('img');
  img.setAttribute('src', character.sprites.other['official-artwork'].front_default);

  var name = document.createElement('p');
  name.textContent = character.name.toUpperCase();
  name.setAttribute('class', 'name');

  var characterData = {};

  characterData.name = character.name.toUpperCase();
  characterData.image = character.sprites.other['official-artwork'].front_default;
  characterData.charID = character.id;
  characterData.type1 = character.types[0].type.name.toUpperCase();
  if (!characterData.type2 === undefined) {
    characterData.type2 = character.types[1].type.name;
  } else {
    characterData.type2 = 'None';
  }
  characterData.statsHP = character.stats[0].base_stat;

  data.entries.push(characterData);

  li.appendChild(name);
  li.appendChild(img);

  return li;
}

ul.addEventListener('click', handleListClick);

function handleListClick(event) {
  var liCharacter = event.target.closest('[data-character-id]');

  var nameChar = document.querySelector('.details-name');
  var imgChar = document.querySelector('.details-img');
  var indexChar = document.querySelector('.details-pokedexNumber');
  var type1Char = document.querySelector('.details-type1');
  var type2Char = document.querySelector('.details-type2');
  var statsCharHP = document.querySelector('.details-stats');

  for (let i = 0; i < data.entries.length; i++) {
    if (Number(liCharacter.getAttribute('data-character-id')) === data.entries[i].charID) {
      nameChar.textContent = 'Name: ' + data.entries[i].name.toUpperCase();
      indexChar.textContent = 'Pokedex #: ' + data.entries[i].charID;
      type1Char.textContent = 'Type 1: ' + data.entries[i].type1;
      type2Char.textContent = 'Type 2: ' + data.entries[i].type2;
      statsCharHP.textContent = 'HP Stat: ' + data.entries[i].statsHP;
      imgChar.setAttribute('src', data.entries[i].image);
    }
  }

  resultsPage.classList.add('hidden');
  searchPage.classList.add('hidden');
  detailsPage.classList.remove('hidden');
  data.view = 'details-page';
}
