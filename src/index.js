import axios from 'axios';
import API from '/src/cat-api';
import Notiflix from 'notiflix';
//import SlimSelect from 'slim-select';

const select = document.querySelector('.breed-select');
const loaderString = document.querySelector('.loader');
const errorString = document.querySelector('.error');
const catContainer = document.querySelector('.cat-info');

//document.style.backgroundImage = 'url("images/cat-bg.jpg")';
let placeholder = document.createElement('option');
placeholder.textContent = 'Please, select a cat';
select.append(placeholder);

axios.defaults.headers.common['x-api-key'] =
  'live_kf09OSiO5Mp8otyJDizuOeRNmxUrgFQO1MKv43Iw5wiNcLE0IDoxoQLB1zuQv27o';

hideEl(loaderString);
hideEl(errorString);

API.fetchBreeds()
  .then(data => {
    data.map(({ id, name }) => {
      const markup = `<option value="${id}">${name}</option>`;
      return select.insertAdjacentHTML('beforeend', markup);
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
      const breedInfo = data[0].breeds[0];
      data
        .map(el => {
          const markup = 
      `<img class="card-img" src="${el.url}" alt="${breedInfo.alt_names}" width="360px">
      <div class="card-text-container">
      <h2 class="card-title">${breedInfo.name}</h2>
      <p class="card-text">${breedInfo.description}</p>
      <p class="card-text"><b>Temperament</b>: ${breedInfo.temperament}.</p>
      </div>`;
          return (catContainer.innerHTML = markup);
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

function hideEl(el) {
  el.classList.add('hidden');
}

function showEl(el) {
  el.classList.remove('hidden');
}
