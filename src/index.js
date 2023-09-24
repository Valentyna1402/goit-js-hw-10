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


loaderString.classList.add('hidden');
errorString.classList.add('hidden');

API.fetchBreeds()
  .then(data => {
    if (data.length === 0) {
      throw new Error(response.statusText);
    }
    data.map(el => {
      return select.insertAdjacentHTML(
        'beforeend',
        `<option value="${el.id}">${el.name}</option>`
      );
    });
  })
  .catch(error => {
    console.log(error);
    select.classList.add('hidden');
    Notiflix.Notify.failure('Oops! Something went wrong!');
    errorString.classList.remove('hidden');
  });

select.addEventListener('change', onSelectChange);

function onSelectChange() {
  placeholder.classList.add('hidden');;
  select.classList.add('hidden');
  loaderString.classList.remove('hidden');

  API.fetchCatByBreed(select.value)
    .then(data => {
      const breedInfo = data[0].breeds[0];
      
      data
        .map(el => {
          return (catContainer.innerHTML = `<img class="card-img" src="${el.url}" alt="${breedInfo.alt_names}" width="400px">
  <h2 class="card-title">${breedInfo.name}</h2>
  <p class="card-text">${breedInfo.description}</p>
  <p class="card-text"><b>Temperament</b>: ${breedInfo.temperament}</p>`);
        })
        .join('');
    })
    .catch(error => {
      console.log(error);  
      catContainer.classList.add('hidden');
      Notiflix.Notify.failure('Oops! Something went wrong!');
      errorString.classList.remove('hidden');
    })
    .finally(() => {
      loaderString.classList.add('hidden');
      select.classList.remove('hidden');
      select.value = (placeholder.textContent = 'Select another cat');
    });
}
