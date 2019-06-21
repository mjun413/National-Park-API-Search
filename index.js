'use strict';

const apiKey = "lv4lWP6ftTXHz4qilazGeuJteJHBhvh1zrabWTCz"

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = `stateCode=${params["stateCode"]}&limit=${params["limit"]}&api_key=${params["apiKey"]}&fields=${params["fields"]}`;
    return queryItems;
}

function displayResults(responseJson, maxResults) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length & i<maxResults ; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>`);
    $('#results-list').append( 
      `<p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>`
    );
    if (responseJson.data[i].addresses[0]) {
      $('#results-list').append(`
        <p>
          ${responseJson.data[i].addresses[0].line1}<br>
          ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}<br>
        </p>
      `); 
    }
    $('#results-list').append(`</li><hr>`);
  }
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    apiKey: apiKey,
    fields: "addresses"
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
      displayResults(myJson, maxResults);
    });
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
