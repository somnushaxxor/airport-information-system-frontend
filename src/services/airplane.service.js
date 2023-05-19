import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/airplanes`);
}

const getAllFiltered = (homeAirportId, joinedAt) => {
    return httpClient.get(`/airplanes?homeAirportId=${homeAirportId}&joinedAt=${joinedAt}`);
}

const create = (data) => {
    return httpClient.post(`/airplanes`, data);
}

const getById = (id) => {
    return httpClient.get(`/airplanes/${id}`);
}

const update = (data) => {
    return httpClient.put(`/airplanes`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/airplanes/${id}`);
}

const exported = { getAll, getAllFiltered, create, getById, update, deleteById };

export default exported;