import './sass/main.scss';
import card from './templates/card.hbs'
import Notiflix from 'notiflix';
import NewsApiService from './js/fetchImages';
import LoadMoreBtn from './js/loadMoreBtn';

const refs = {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.gallery'),
    // loadMore: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

const loadMoreBtn = new LoadMoreBtn('.load-more');
const newsApiService = new NewsApiService();

// let requestWord = '';

function onSearch(e) {
  e.preventDefault();

  clearImageCards();
  newsApiService.searchWord = e.target.elements.searchQuery.value.trim();
  newsApiService.resetPage();
  newsApiService.getImages().then(({ hits, totalHits }) => {
    if (newsApiService.searchWord === '') {
      Notiflix.Notify.info(`Enter any word`) 
    } else if (hits.length === 0) {
      onFetchError();
    } else {
      renderImageCards(hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
  });
}

function onLoadMore() {
  newsApiService.getImages().then(({ hits, totalHits }) => renderImageCards(hits));
}

function renderImageCards(word) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', card(word));
}

function clearImageCards() {
  refs.articlesContainer.innerHTML = '';
}

function onFetchError(error) {
  // console.log(error);
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
}