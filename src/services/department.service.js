import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/departments`);
}

export default { getAll };