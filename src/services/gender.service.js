import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/genders`);
}

const exported = { getAll };

export default exported;