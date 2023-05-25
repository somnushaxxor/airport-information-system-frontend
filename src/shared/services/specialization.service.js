import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/specializations`);
}

const getById = (id) => {
    return httpClient.get(`/specializations/${id}`);
}

const create = (data) => {
    return httpClient.post(`/specializations`, data);
}

const update = (data) => {
    return httpClient.put(`/specializations`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/specializations/${id}`);
}

const exported = { getAll, getById, create, update, deleteById };

export default exported;