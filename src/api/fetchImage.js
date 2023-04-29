import axios from 'axios';

const fetchImage = (query, page = 1) => {
    return axios.get('https://pixabay.com/api/', {
        params: {
            key: '34119717-c2cb4bf5c1e24db7e8481730d',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page
        },
    });
};

export default fetchImage;