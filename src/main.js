import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showErrorMessage } from './js/render-function.js';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  currentQuery = input.value.trim();

  if (!currentQuery) {
    showErrorMessage('Please enter a search query.');
    return;
  }

  clearGallery();
  currentPage = 1;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      return;
    }
    renderImages(data.hits);
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    showErrorMessage('Failed to fetch images. Please try again later.');
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);
  } catch (error) {
    showErrorMessage('Failed to fetch more images.');
  }
}