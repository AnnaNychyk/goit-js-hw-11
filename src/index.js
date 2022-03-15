import './sass/main.scss';
import GetImages from './js/fetchImages';
import card from './templates/card.hbs'
import Notiflix from 'notiflix';
import NewsApiService from './js/fetchImages'

const refs = {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
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
refs.loadMore.addEventListener('click', onLoadMore);


const newsApiService = new NewsApiService();

// let requestWord = '';

function onSearch(e) {
  e.preventDefault();
  newsApiService.searchWord = e.target.elements.searchQuery.value;
    if (newsApiService.searchWord !== '') {
      newsApiService.getImages().then(word => renderImageCards(word));
      Notiflix.Notify.success(`Hooray! We found totalHits images.`);
    }
    // else if (response.data.hits === []) {
    //   onFetchError();
    // }
    else {
      Notiflix.Notify.info(`Enter any word`)
    }
}

function onLoadMore () {
  if (newsApiService.searchWord !== '') {
      newsApiService.getImages().then(word => renderImageCards(word));
      Notiflix.Notify.success(`Hooray! We found totalHits images.`);
    }
    // else if (response.data.hits === []) {
    //   onFetchError();
    // }
    else {
      Notiflix.Notify.info(`Enter any word`)
    }
}

function renderImageCards (word) {
  refs.articlesContainer.innerHTML = card(word);
}

function onFetchError(error) {
  // console.log(error);
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
}