import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/routes`);
}

const getById = (id) => {
    return httpClient.get(`/routes/${id}`);
}

const create = (data) => {
    return httpClient.post(`/routes`, data);
}

const update = (data) => {
    return httpClient.put(`/routes`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/routes/${id}`);
}

const exported = { getAll, getById, create, update, deleteById };

export default exported;