import axios from 'axios';

// Base URL for the Rails backend
const API = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your Rails server URL
});

// Fetch all users
export const fetchUsers = () => API.get('/users');

// Fetch a single user by ID
export const fetchUserById = (id) => API.get(`/users/${id}`);

// Create a new user
export const createUser = (userData) => API.post('/users', { user: userData });

// Update a user
export const updateUser = (id, userData) => API.patch(`/users/${id}`, { user: userData });

// Delete a user
export const deleteUser = (id) => API.delete(`/users/${id}`);

