const BASE_URL = 'https://pixabay.com/api/';

async function getPhotos() {
  try {
    const response = await axios.get('BASE_URL', {
      params: {
        key: '36044899-e18e2ff497f22a2f7cea9b850',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export default { getPhotos };