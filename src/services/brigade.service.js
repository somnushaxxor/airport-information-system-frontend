import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/brigades`);
}

const getAllBy = (specializationId, departmentId) => {
    return httpClient.get(`/brigades?specializationId=${specializationId}&departmentId=${departmentId}`);
}

const exported = { getAll, getAllBy };

export default exported;