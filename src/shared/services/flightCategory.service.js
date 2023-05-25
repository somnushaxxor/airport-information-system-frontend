import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/flights/categories`);
}

const getById = (id) => {
    return httpClient.get(`/flights/categories/${id}`);
}

const create = (data) => {
    return httpClient.post(`/flights/categories`, data);
}

const update = (data) => {
    return httpClient.put(`/flights/categories`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/flights/categories/${id}`);
}

const exported = { getAll, getById, create, update, deleteById };

export default exported;