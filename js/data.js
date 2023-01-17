/* exported data */

var data = {
  view: 'home-page',
  entries: [],
  favorite: [],
  nextEntryID: 1
};

function storeData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('favorite-pokemon-entries', dataJSON);
}

window.addEventListener('beforeunload', storeData);

var previousDataJSON = localStorage.getItem('favorite-pokemon-entries');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
