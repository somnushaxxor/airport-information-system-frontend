import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/employees`);
}

const getAllFiltered = (genderId, departmentId, brigadeId, workExperienceInYears, ageInYears, numberOfChildren,
    salary) => {
    return httpClient.get(`/employees?genderId=${genderId}&departmentId=${departmentId}&brigadeId=${brigadeId}&workExperienceInYears=${workExperienceInYears}&ageInYears=${ageInYears}&numberOfChildren=${numberOfChildren}&salary=${salary}`);
}

const create = (data) => {
    return httpClient.post(`/employees`, data);
}

const getById = (id) => {
    return httpClient.get(`/employees/${id}`);
}

const update = (data) => {
    return httpClient.put(`/employees`, data);
}

const deleteById = (id) => {
    return httpClient.delete(`/employees/${id}`);
}

const exported = { getAll, getAllFiltered, create, getById, update, deleteById };

export default exported;