import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/employees/attributes/values`);
}

const getAllFiltered = (employeeId) => {
    return httpClient.get(`/employees/attributes/values?employeeId=${employeeId}`);
}

const getById = (id) => {
    return httpClient.get(`/employees/attributes/values/${id}`);
}

const create = (data) => {
    return httpClient.post(`/employees/attributes/values`, data);
}

const update = (data) => {
    return httpClient.put(`/employees/attributes/values`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/employees/attributes/values/${id}`);
}

const exported = { getAll, getAllFiltered, getById, create, update, deleteById };

export default exported;