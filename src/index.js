import axios from 'axios';
import API from '/src/cat-api';
import Notiflix from 'notiflix';
//import SlimSelect from 'slim-select';

const select = document.querySelector('.breed-select');
const loaderString = document.querySelector('.loader');
const errorString = document.querySelector('.error');
const catContainer = document.querySelector('.cat-info');

let placeholder = document.createElement('option');
placeholder.textContent = 'Please, select a cat';
select.append(placeholder);

axios.defaults.headers.common['x-api-key'] =
  'live_kf09OSiO5Mp8otyJDizuOeRNmxUrgFQO1MKv43Iw5wiNcLE0IDoxoQLB1zuQv27o';

hideEl(loaderString);
hideEl(errorString);

API.fetchBreeds()
  .then(data => {
    data.map((el) => {
      return select.insertAdjacentHTML('beforeend', createSelectMarkup(el));
    });
  })
  .catch(error => {
    console.log(error);
    hideEl(select);
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

select.addEventListener('change', onSelectChange);

function onSelectChange() {
  hideEl(placeholder);
  hideEl(select);
  hideEl(catContainer);
  showEl(loaderString);

  API.fetchCatByBreed(select.value)
    .then(data => {
      if (data.length === 0) {
        throw new Error(response.statusText);
      }
      
      data
        .map(el => {
          return (catContainer.innerHTML = createCardMarkup(el));
        })
        .join('');
      showEl(catContainer);
    })
    .catch(error => {
      console.log(error);
      hideEl(catContainer);
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      hideEl(loaderString);
      showEl(select);
      select.value = placeholder.textContent = 'Select another cat';
    });
}

function createSelectMarkup(el) {
  return markup = `<option value="${el.id}">${el.name}</option>`;
}

function createCardMarkup(el) {
  return  markup = 
  `<img class="card-img" src="${el.url}" alt="${el.breeds[0].alt_names}" width="360px">
  <div class="card-text-container">
  <h2 class="card-title">${el.breeds[0].name}</h2>
  <p class="card-text">${el.breeds[0].description}</p>
  <p class="card-text"><b>Temperament</b>: ${el.breeds[0].temperament}.</p>
  </div>`;
}

function hideEl(el) {
  el.classList.add('hidden');
}

function showEl(el) {
  el.classList.remove('hidden');
}
