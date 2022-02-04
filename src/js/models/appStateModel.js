import { RESULTS_PER_PAGE } from '../config.js';

class AppStateModel {
  recipe = {};
  search = {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  };
  bookmarks = [];
}

export const state = new AppStateModel();
