import './sass/main.scss';
import axios from 'axios';

const API_KEY = '25809768-5f151ed3e9c60947c53759114';
const BASE_URL = 'https://pixabay.com/api';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.gallery'),
}

const options = {
  headers: {
    key: API_KEY,
    word: '',
  },
};

const url = ``;

fetch(url, options).then(response => response.json()).then(console.log);


export default class NewsApiService {
  constructor() {
    this.word = '';
    this.page = 1;
    this.API_KEY = API_KEY;
    this.BASE_URL = BASE_URL;
  }

  fetchArticles() {
    const url = `${this.BASE_URL}/?key=${this.API_KEY}&q=${this.word}&image_type='photo'&page=${this.page}&per_page=40&orientation='horizontal'&safesearch='true'`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({ articles }) => {
        this.incrementPage();
        return articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}