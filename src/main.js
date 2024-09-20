import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showErrorMessage } from './js/render-function.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('#loader');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearch);


function onSearch(event) {
  event.preventDefault();
  currentQuery = input.value.trim();

  if (!currentQuery) {
    showErrorMessage('Please enter a search query.');
    return;
  }

  clearGallery();
  showLoader();
  currentPage = 1;

  fetchImages(currentQuery, currentPage)
    .then(data => {
      hideLoader();
      if (data.hits.length === 0) {
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
        return;
      }
      renderImages(data.hits);
    })
    .catch(error => {
      hideLoader();
      showErrorMessage('Failed to fetch images. Please try again later.');
    });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}