import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  #window = document.querySelector('.add-recipe-window');
  #overlay = document.querySelector('.overlay');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.#addHandlerShowWindow();
    this.#addHandlerHideWindow();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //In this case this is the parentElement which is the upload form
      //Spread weird object into an array so that we can use the form fields
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  toggleWindow() {
    this.#overlay.classList.toggle('hidden');
    this.#window.classList.toggle('hidden');
  }

  #addHandlerShowWindow() {
    this.#btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  #addHandlerHideWindow() {
    this.#btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this.#overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new AddRecipeView();
