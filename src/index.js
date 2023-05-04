import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markUp from './galleryMarkUp.hbs';
import './css/styles.css';
import axios from 'axios';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36044899-e18e2ff497f22a2f7cea9b850';
const PER_PAGE = 40;

let currentPage = 1;
let counter = 0;

async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: PER_PAGE,
      },
    });

    counter += response.data.hits.length;

    onMarkUpPhotos(response);

    if (counter > 0) {
      setTimeout(() => {
        loadMoreBtn.classList.remove('is-hidden');
      }, 1000);
    }

    if (counter >= response.data.totalHits && response.data.totalHits > 0) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
    if (response.data.hits.length === 0) {
      throw 'error';
    }
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function onSubmit(event) {
  event.preventDefault();
  loadMoreBtn.classList.add('is-hidden');
  clearGallery();
  currentPage = 1;
  const searchQuery = input.value.trim();
  fetchImages(searchQuery);
}

function onMarkUpPhotos(e) {
  gallery.insertAdjacentHTML('beforeend', markUp(e));
}

function onLoadMore() {
  currentPage += 1;
  fetchImages(input.value.trim());
}

function clearGallery() {
  gallery.innerHTML = '';
}
