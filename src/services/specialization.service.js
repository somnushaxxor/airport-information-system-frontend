import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/specializations`);
}

export default { getAll };