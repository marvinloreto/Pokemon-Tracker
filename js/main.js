var formSearch = document.querySelector('.poke-submit');
var pokeInput = document.querySelector('.poke-input');
var searchPage = document.querySelector('.searchbox-container');
var resultsPage = document.querySelector('.result-container');
var ul = document.querySelector('.results-list');
var detailsPage = document.querySelector('.details-container');
var buttonSearch = document.querySelector('.button-search');
var titleLink = document.querySelector('.nav-home');
var favoritesPage = document.querySelector('.favorites-container');
var favoriteLink = document.querySelector('.nav-favorite');
var buttonFav = document.querySelector('.add-favorite');
var favoriteList = document.querySelector('#favorites-list');

buttonSearch.addEventListener('click', handleSearch);
function handleSearch(event) {
  resultsPage.classList.remove('hidden');
  searchPage.classList.add('hidden');
  detailsPage.classList.add('hidden');
  favoritesPage.classList.add('hidden');
  data.view = 'results-page';
}

titleLink.addEventListener('click', handleHome);
function handleHome(event) {
  searchPage.classList.remove('hidden');
  detailsPage.classList.add('hidden');
  resultsPage.classList.add('hidden');
  favoritesPage.classList.add('hidden');
  data.view = 'home-page';
}

favoriteLink.addEventListener('click', handleFavorite);
function handleFavorite(event) {
  favoritesPage.classList.remove('hidden');
  searchPage.classList.add('hidden');
  detailsPage.classList.add('hidden');
  resultsPage.classList.add('hidden');
  data.view = 'favorites-page';
}

formSearch.addEventListener('submit', handleSubmit);
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
  if (typeof character.types[1] === 'undefined') {
    characterData.type2 = 'None';
  } else {
    characterData.type2 = character.types[1].type.name.toUpperCase();
  }
  characterData.shinyImage = character.sprites.other['official-artwork'].front_shiny;

  data.entries.push(characterData);

  li.appendChild(name);
  li.appendChild(img);

  return li;
}

ul.addEventListener('click', handleListClick);
favoriteList.addEventListener('click', handleListClick);

function handleListClick(event) {
  var liCharacter = event.target.closest('[data-character-id]');

  var nameChar = document.querySelector('.details-name');
  var imgChar = document.querySelector('.details-img');
  var indexChar = document.querySelector('.details-pokedexNumber');
  var type1Char = document.querySelector('.details-type1');
  var type2Char = document.querySelector('.details-type2');
  var imgShinyChar = document.querySelector('.image-shiny');
  var detailRow = document.querySelector('.detail-row');

  for (let i = 0; i < data.entries.length; i++) {
    if (Number(liCharacter.getAttribute('data-character-id')) === data.entries[i].charID) {
      nameChar.textContent = 'Name: ' + data.entries[i].name.toUpperCase();
      indexChar.textContent = 'Pokedex #: ' + data.entries[i].charID;
      type1Char.textContent = 'Type 1: ' + data.entries[i].type1;
      type2Char.textContent = 'Type 2: ' + data.entries[i].type2;
      imgShinyChar.setAttribute('src', data.entries[i].shinyImage);
      imgChar.setAttribute('src', data.entries[i].image);
      detailRow.setAttribute('data-character-id', data.entries[i].charID);

    }
  }

  resultsPage.classList.add('hidden');
  searchPage.classList.add('hidden');
  favoritesPage.classList.add('hidden');
  detailsPage.classList.remove('hidden');
  data.view = 'details-page';

  for (let i = 0; i < data.favorite.length; i++) {
    if (Number(liCharacter.getAttribute('data-character-id')) === data.favorite[i].charID) {
      buttonFav.classList.add('hidden');
    } else {
      buttonFav.classList.remove('hidden');
    }
  }
}

var favList = document.querySelector('#favorites-list');

buttonFav.addEventListener('click', handleAddToFavorites);
function handleAddToFavorites(event) {
  var favoriteChar = event.target.closest('[data-character-id]');

  for (let i = 0; i < data.entries.length; i++) {
    if (Number(favoriteChar.getAttribute('data-character-id')) === data.entries[i].charID) {
      data.favorite.push(data.entries[i]);
    }
  }

  favList.appendChild(getFavoriteList(data.favorite[data.favorite.length - 1]));

  resultsPage.classList.add('hidden');
  searchPage.classList.add('hidden');
  detailsPage.classList.add('hidden');
  favoritesPage.classList.remove('hidden');
}

function getFavoriteList(dataEntries) {
  var favColumn = document.createElement('div');
  favColumn.setAttribute('class', 'column-third');

  var favoriteItem = document.createElement('div');
  favoriteItem.setAttribute('class', 'favorite-poke');
  favoriteItem.setAttribute('data-character-id', dataEntries.charID);

  var favImage = document.createElement('img');
  favImage.setAttribute('src', dataEntries.image);
  favImage.setAttribute('class', 'favoriteImage');

  favoriteItem.appendChild(favImage);
  favColumn.appendChild(favoriteItem);

  return favColumn;

}
