import './sass/main.scss';
import card from './templates/card.hbs'
import Notiflix from 'notiflix';
import NewsApiService from './js/fetchImages';
import LoadMoreBtn from './js/loadMoreBtn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.gallery'),
}

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
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
    } else {
      loadMoreBtn.show();
      renderImageCards(hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      lightbox.refresh();
    }
  });
}

function onLoadMore() {
  newsApiService.getImages().then(({ hits, totalHits }) => {
    renderImageCards(hits);
    lightbox.refresh();
    if (document.querySelectorAll('.photo-card').length >= totalHits) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.hide();
    }
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

function checkTotalHits() {
  newsApiService.getImages().then(({ hits, totalHits }) => {
    // const total = document.querySelectorAll('.photo-card').length;
    if (document.querySelectorAll('.photo-card').length >= totalHits) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.hide();
    }
  });
}
