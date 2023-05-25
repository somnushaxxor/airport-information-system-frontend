import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/airports`);
}

const exported = { getAll };

export default exported;