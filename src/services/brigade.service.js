import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/brigades`);
}

const getAllFiltered = (specializationId, departmentId) => {
    return httpClient.get(`/brigades?specializationId=${specializationId}&departmentId=${departmentId}`);
}

const exported = { getAll, getAllFiltered };

export default exported;