import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showErrorMessage } from './js/render-function.js';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');

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
  currentPage = 1;

  fetchImages(currentQuery, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
        loadMoreBtn.style.display = 'none';
        return;
      }
      renderImages(data.hits);
      loadMoreBtn.style.display = data.hits.length < 12 ? 'none' : 'block';
    })
    .catch(error => {
      showErrorMessage('Failed to fetch images. Please try again later.');
    });
}

function onLoadMore() {
  currentPage += 1;

  fetchImages(currentQuery, currentPage)
    .then(data => {
      renderImages(data.hits);
      if (data.hits.length < 12) {
        loadMoreBtn.style.display = 'none';
      }
    })
    .catch(error => {
      showErrorMessage('Failed to fetch more images.');
    });
}