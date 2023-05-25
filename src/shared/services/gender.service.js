import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/genders`);
}

const exported = { getAll };

export default exported;