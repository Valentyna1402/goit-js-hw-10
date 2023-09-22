import axios from 'axios';
import API from '/src/cat-api';

const select = document.querySelector('.breed-select');
const loaderString = document.querySelector('.loader');
const errorString = document.querySelector('.error');
const catContainer = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_kf09OSiO5Mp8otyJDizuOeRNmxUrgFQO1MKv43Iw5wiNcLE0IDoxoQLB1zuQv27o';

renderSelect();

select.addEventListener('change', onSelectChange);

function onSelectChange() {
  renderCardMarkup();
}

function renderCardMarkup() {
  API.fetchCatByBreed().then(data => {
    data.map(el =>
      catContainer.insertAdjacentHTML(
        'beforeend',
        `<img src="${el.url}" alt="cat image" width="400px">`
      )
    );
  });

  API.fetchBreeds().then(data => {
    data.map(el => {
      if (select.value === el.id) {
        catContainer.insertAdjacentHTML(
          'beforeend',
          `<h2 class="card-title">${el.name}</h2><p class="card-text">${el.description}</p><p class="card-text">Temperament:${el.temperament}</p>`
        );
      }
    });
  });
}

function renderSelect() {
  API.fetchBreeds().then(data => {
    data.map(element =>
      select.insertAdjacentHTML(
        'beforeend',
        `<option value="${element.id}">${element.name}</option>`
      )
    );
  });
}
