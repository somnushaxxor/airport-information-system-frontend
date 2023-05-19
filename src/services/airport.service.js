import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/airports`);
}

const exported = { getAll };

export default exported;