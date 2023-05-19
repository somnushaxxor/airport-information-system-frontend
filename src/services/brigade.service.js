import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/brigades`);
}

const getAllFiltered = (specializationId, departmentId) => {
    return httpClient.get(`/brigades?specializationId=${specializationId}&departmentId=${departmentId}`);
}

const getById = (id) => {
    return httpClient.get(`/brigades/${id}`);
}

const create = (data) => {
    return httpClient.post(`/brigades`, data);
}

const update = (data) => {
    return httpClient.put(`/brigades`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/brigades/${id}`);
}

const getAllNonemptyPilotsBrigades = () => {
    return httpClient.get(`/brigades/pilots`);
}

const getAllNonemptyTechniciansBrigades = () => {
    return httpClient.get(`/brigades/technicians`);
}

const getAllNonemptyServiceBrigades = () => {
    return httpClient.get(`/brigades/service`);
}

const exported = {
    getAll, getAllFiltered, getById, create, update, deleteById, getAllNonemptyPilotsBrigades,
    getAllNonemptyTechniciansBrigades, getAllNonemptyServiceBrigades
};

export default exported;