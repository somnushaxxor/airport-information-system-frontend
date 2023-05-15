import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/genders`);
}

export default { getAll };