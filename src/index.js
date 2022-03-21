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

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

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
    }  else {
      loadMoreBtn.show();
      renderImageCards(hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      checkTotalHits();
    }
  });
  
}

function onLoadMore() {
  newsApiService.getImages().then(({ hits, totalHits }) => {
    renderImageCards(hits);
    checkTotalHits();
  });
}

function renderImageCards(word) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', card(word));
}

function clearImageCards() {
  loadMoreBtn.hide();
  refs.articlesContainer.innerHTML = '';
}

function onFetchError(error) {
  // console.log(error);
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
}

function checkTotalHits(totalHits) {
  // const total = document.querySelectorAll('.photo-card').length;
  // console.log(total);
  // if (total >= totalHits) {
  //   Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  //   loadMoreBtn.hide();
  // }

  if (page > (totalHits / per_page)) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.hide();
  }
}