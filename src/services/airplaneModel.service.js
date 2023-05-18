import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/airplanes/models`);
}

const getById = (id) => {
    return httpClient.get(`/airplanes/models/${id}`);
}

const create = (data) => {
    return httpClient.post(`/airplanes/models`, data);
}

const update = (data) => {
    return httpClient.put(`/airplanes/models`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/airplanes/models/${id}`);
}

const exported = { getAll, getById, create, update, deleteById };

export default exported;