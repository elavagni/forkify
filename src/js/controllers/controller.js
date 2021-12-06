import * as bookmarksModel from '../models/bookmarksModel.js';
import * as recipeController from '../controllers/recipeController.js';
import * as searchResultsController from '../controllers/searchResultsController.js';
import { state } from '../models/appStateModel.js';

import recipeView from '../views/recipeView.js';
import bookmarksView from '../views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

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
  searchResultsController.init();
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};

init();
