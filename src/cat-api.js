const BASE_URL = 'https://api.thecatapi.com/v1';
const select = document.querySelector('.breed-select');
const API_KEY = 'live_kf09OSiO5Mp8otyJDizuOeRNmxUrgFQO1MKv43Iw5wiNcLE0IDoxoQLB1zuQv27o';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    
}

function fetchCatByBreed(breedId) {
  breedId = select.value;
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
}

export default { fetchBreeds, fetchCatByBreed };

