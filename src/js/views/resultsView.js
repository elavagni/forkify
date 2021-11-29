import View from './view.js';
import previewView from './previewView';

class ResutlsView extends View {
  _parentElement = document.querySelector('.results');
  _message = '';
  _errorMessage = 'No recipes found for your query! Please try another one!';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResutlsView();
