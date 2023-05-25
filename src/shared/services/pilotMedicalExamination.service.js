import httpClient from '../../http-common';

const getAll = () => {
    return httpClient.get(`/pilots-medical-examinations`);
}

const getAllFiltered = () => {
    return httpClient.get(`/pilots-medical-examinations`);
}

const create = (data) => {
    return httpClient.post(`/pilots-medical-examinations`, data);
}

const getById = (id) => {
    return httpClient.get(`/pilots-medical-examinations/${id}`);
}

const update = (data) => {
    return httpClient.put(`/pilots-medical-examinations`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/pilots-medical-examinations/${id}`);
}

const exported = { getAll, getAllFiltered, create, getById, update, deleteById };

export default exported;