import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/departments`);
}

const exported = { getAll };

export default exported;