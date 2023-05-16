import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/employees`);
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

// const getAllSorted = (curPage, recordPerPage, sortBy) => {
//     return httpClient.get(`/actors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&name=&height=&age=&vocals=&gender=`);
// }

// const getAllFiltered = (curPage, recordPerPage, name, gender, height, age, vocals) => {
//     return httpClient.get(`/actors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=${name}&height=${height}&age=${age}&vocals=${vocals}&gender=${gender}`);
// }

const exported = { getAll, create, getById, update, deleteById };

export default exported;