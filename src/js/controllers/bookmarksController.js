import * as bookmarksModel from '../models/bookmarksModel.js';
import { state } from '../models/appStateModel.js';

import recipeView from '../views/recipeView.js';
import bookmarksView from '../views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const toggleBookmark = function () {
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

const renderBookmarks = function () {
  bookmarksView.render(state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(renderBookmarks);
  recipeView.addHandlerAddBookmark(toggleBookmark);
};

init();
