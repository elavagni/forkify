import * as bookmarksModel from '../models/bookmarksModel.js';
import * as searchResultsModel from '../models/searchResultsModel.js';
import * as recipeController from '../controllers/recipeController.js';
import { state } from '../models/appStateModel.js';

import searchView from '../views/searchView.js';
import recipeView from '../views/recipeView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';
import bookmarksView from '../views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlSearchResults = async function () {
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

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(searchResultsModel.getSearchResultsPage(goToPage));

  //Show new pagination buttons
  paginationView.render(state.search);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!state.recipe.bookmarked) {
    bookmarksModel.addBookmark(state.recipe);
  } else {
    bookmarksModel.deleteBookmark(state.recipe.id);
  }
  // update recipe view
  recipeView.update(state.recipe);

  // render bookmarks
  bookmarksView.render(state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(state.bookmarks);
};

const init = function () {
  recipeController.init();
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
