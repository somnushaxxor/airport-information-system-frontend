import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/employees/attributes`);
}

const getById = (id) => {
    return httpClient.get(`/employees/attributes/${id}`);
}

const create = (data) => {
    return httpClient.post(`/employees/attributes`, data);
}

const update = (data) => {
    return httpClient.put(`/employees/attributes`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/employees/attributes/${id}`);
}

const exported = { getAll, getById, create, update, deleteById };

export default exported;