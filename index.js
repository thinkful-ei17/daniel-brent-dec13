'use strict';
/* global $ */
const THINKFULTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyABXXeV8aMin40PRbJCkSHUgltqh5Ehj4c';
function getDataFromApi(searchTerm, callback) {
  const data = {
    part: 'snippet',
    resultsPerPage: 5,
    order: 'viewCount',
    q: searchTerm,
    key: API_KEY
  };
  $.getJSON(THINKFULTUBE_SEARCH_URL, data, callback);
}

function renderResult(result) {
  return `
    <div>
      <img class="js-thumbnail" href="${result.item.url}" target="_blank">${result.items.title} />
      </div>
  `;
}

function displayYouTubeSearchData(data) {
  console.log('displayYouTubeSearchData ran!');
  const results = data.items.map((item, index) => renderResult(item));
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
