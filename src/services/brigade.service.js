import httpClient from '../http-common.js';

const getAllBrigades = () => {
    return httpClient.get(`/brigades`);
}

const getBrigadesBy = (specializationId, departmentId) => {
    return httpClient.get(`/brigades?specializationId=${specializationId}&departmentId=${departmentId}`);
}

export default { getAllBrigades, getBrigadesBy };