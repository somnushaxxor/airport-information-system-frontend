import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/specializations`);
}

const exported = { getAll };

export default exported;