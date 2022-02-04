import * as recipeModel from '../models/recipeModel.js';
import * as searchResultsModel from '../models/searchResultsModel.js';
import { state } from '../models/appStateModel.js';

import { MODAL_CLOSE_SEC } from '../config.js';
import recipeView from '../views/recipeView.js';
import resultsView from '../views/resultsView.js';
import bookmarksView from '../views/bookmarksView.js';
import addRecipeView from '../views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

export const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //show spinner
    recipeView.renderSpinner();

    //update results to show active recipe
    resultsView.update(searchResultsModel.getSearchResultsPage());
    bookmarksView.update(state.bookmarks);

    //Loading recipe
    await recipeModel.loadRecipe(id);

    //Render recipe
    recipeView.render(state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

export const addRecipe = async function (newRecipe) {
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();

    //upload recipe data
    await recipeModel.uploadRecipe(newRecipe);

    //Render recipe
    recipeView.render(state.recipe);

    //Display success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${state.recipe.id}`);

    //Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

export const updateServings = function (newServings) {
  //update the recipe servings (in state)
  recipeModel.updateServings(newServings);

  //update the recipe view
  recipeView.update(state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(getRecipe);
  recipeView.addHandlerUpdateServings(updateServings);
  addRecipeView.addHandlerUpload(addRecipe);
};

init();
