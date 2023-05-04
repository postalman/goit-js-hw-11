import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import './css/styles.css';

const input = document.querySelector('input[searchQuery]');
const btn = document.querySelector('button[type="submit"');

btn.addEventListener('submit', onSubmit);


