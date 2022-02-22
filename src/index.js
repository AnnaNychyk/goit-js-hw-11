import './sass/main.scss';
import getImages from './js/fetchImages';
import card from './templates/card.hbs'
import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.gallery'),
}

// const options = {
//   headers: {
//     key: API_KEY,
//     word: '',
//     page: 1,
//     BASE_URL: BASE_URL,
//   },
// };

refs.searchForm.addEventListener('submit', onSearch);

let requestWord = '';

function onSearch(e) {
  e.preventDefault();
  requestWord = e.target.elements.searchQuery.value.trim();

  try {
    if (requestWord !== '') {
      getImages(requestWord).then(word => renderImageCards(word));
    }
    else {
      Notiflix.Notify.info(`Enter any word`)
    }
  } catch (error) {
    onFetchError();
   }
}

function renderImageCards (word) {
    refs.articlesContainer.innerHTML = card(word);
}

function onFetchError(error) {
    // console.log(error);
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
}