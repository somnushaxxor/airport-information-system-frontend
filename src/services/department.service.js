import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/departments`);
}

const getById = (id) => {
    return httpClient.get(`/departments/${id}`);
}

const create = (data) => {
    return httpClient.post(`/departments`, data);
}

const update = (data) => {
    return httpClient.put(`/departments`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/departments/${id}`);
}

const appointDepartmentChief = (data) => {
    return httpClient.post(`/departments/chief-appointment`, data);
}

const removeDepartmentChief = (id) => {
    return httpClient.post(`/departments/${id}/chief-removal`);
}

const exported = { getAll, getById, create, update, deleteById, appointDepartmentChief, removeDepartmentChief };

export default exported;