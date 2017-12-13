'use strict';
/* global $ */
const THINKFULTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyABXXeV8aMin40PRbJCkSHUgltqh5Ehj4c';
function getDataFromApi(searchTerm, callback) {
  const data = {
    part: 'snippet',
    maxResults: 10,
    order: 'viewCount',
    q: searchTerm,
    key: API_KEY
  };
  $.getJSON(THINKFULTUBE_SEARCH_URL, data, callback);
}

function renderResult(result) {
  console.log(result);
  return `
    <div>
      <img class='js-thumbnail' src='${result.snippet.thumbnails.default.url}'>
    </div>
  `;
}

$('.js-search-results').on('click', function() {
  createModal();
});

function createModal() {
  $('.modal-box').toggle()

  console.log('openModal working');
  
}
// function closeModal() {
//   document.getElementById('myModal').style.display = "none";


function displayYouTubeSearchData(data) {
  const results = data.items.map((item) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val('');
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
