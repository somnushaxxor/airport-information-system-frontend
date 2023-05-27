import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/tickets`);
}

const getAllFiltered = (flightId, genderId, ageInYears) => {
    return httpClient.get(`/tickets?flightId=${flightId}&genderId=${genderId}&ageInYears=${ageInYears}`);
}

const create = (data) => {
    return httpClient.post(`/tickets`, data);
}

const getById = (id) => {
    return httpClient.get(`/tickets/${id}`);
}

const update = (data) => {
    return httpClient.put(`/tickets`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/tickets/${id}`);
}

const exported = { getAll, getAllFiltered, create, getById, update, deleteById };

export default exported;