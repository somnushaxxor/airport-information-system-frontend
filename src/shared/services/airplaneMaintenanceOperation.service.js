import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/airplane-maintenance-operations`);
}

const create = (data) => {
    return httpClient.post(`/airplane-maintenance-operations`, data);
}

const getById = (id) => {
    return httpClient.get(`/airplane-maintenance-operations/${id}`);
}

const update = (data) => {
    return httpClient.put(`/airplane-maintenance-operations`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/airplane-maintenance-operations/${id}`);
}

const exported = { getAll, create, getById, update, deleteById };

export default exported;