import axios from 'axios';

const API_KEY = '25809768-5f151ed3e9c60947c53759114';
const BASE_URL = 'https://pixabay.com/api';

export default async function getImages(word) {
    const response = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${word}&image_type='photo'&page=1&per_page=40&orientation='horizontal'&safesearch='true'`);
    //   console.log(response);
    return response.data.hits;
}
  