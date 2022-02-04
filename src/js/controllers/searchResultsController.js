import * as searchResultsModel from '../models/searchResultsModel.js';
import { state } from '../models/appStateModel.js';

import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const search = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await searchResultsModel.loadSearchResults(query);

    // Render results
    resultsView.render(searchResultsModel.getSearchResultsPage(1));

    //Show pagination
    paginationView.render(state.search);
  } catch (error) {
    console.log(error);
  }
};

const renderPaginatedResults = function (goToPage) {
  // Render new results
  resultsView.render(searchResultsModel.getSearchResultsPage(goToPage));

  //Show new pagination buttons
  paginationView.render(state.search);
};

const init = function () {
  searchView.addHandlerSearch(search);
  paginationView.addHandlerClick(renderPaginatedResults);
};

init();
