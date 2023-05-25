import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/flights`);
}

const getAllFiltered = () => {
    return httpClient.get(`/flights`);
}

const create = (data) => {
    return httpClient.post(`/flights`, data);
}

const getById = (id) => {
    return httpClient.get(`/flights/${id}`);
}

const update = (data) => {
    return httpClient.put(`/flights`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/flights/${id}`);
}

const exported = { getAll, getAllFiltered, create, getById, update, deleteById };

export default exported;