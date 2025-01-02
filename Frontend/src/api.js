import axios from 'axios';


const API = axios.create({
  baseURL: '/api', 
});


export const fetchUsers = () => API.get('/users');


export const fetchUserById = (id) => API.get(`/users/${id}`);


export const createUser = (userData) => API.post('/users', { user: userData });


export const updateUser = (id, userData) => API.patch(`/users/${id}`, { user: userData });


export const deleteUser = (id) => API.delete(`/users/${id}`);

