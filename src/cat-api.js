const BASE_URL = 'https://api.thecatapi.com/v1';
const select = document.querySelector('.breed-select');

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {});
}

function fetchCatByBreed(breedId) {
  breedId = select.value;
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {});
}

export default { fetchBreeds, fetchCatByBreed };

