import axiosInstance from "@/utils/axiosInstance.js";

// Dashboard Stats
export const getDashboardStats = async () => {
    try {
        const response = await axiosInstance.get('/admin/dashboard');
        return response.data; // { totalUsers, totalStores, totalRatings }
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }
};

// Store Management

// Get All Stores
export const getAllStores = async () => {
    try {
        const response = await axiosInstance.get('/admin/stores');
        return response.data.stores; // Array of stores
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }
};

// Get Single Store
export const getSingleStore = async (storeId) => {
    try {
        const response = await axiosInstance.get(`/admin/stores/${storeId}`);
        return response.data.store; // Single store data
    } catch (error) {
        console.error('Error fetching store:', error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }
};

// Create Store
export const createStore = async (name, address, ownerEmail) => {
    try {
        const response = await axiosInstance.post('/admin/stores', { name, address, ownerEmail });
        return response.data.store; // Newly created store
    } catch (error) {
        console.error('Error creating store:', error);
        throw new Error(error.response ? error.response.data.message : 'Error creating store');
    }
};

// Update Store
export const updateStore = async (storeId, name, address) => {
    try {
        const response = await axiosInstance.put(`/admin/stores/${storeId}`, { name, address });
        return response.data.store; // Updated store details
    } catch (error) {
        console.error('Error updating store:', error);
        throw new Error(error.response ? error.response.data.message : 'Error updating store');
    }
};

// Delete Store
export const deleteStore = async (storeId) => {
    try {
        const response = await axiosInstance.delete(`/admin/stores/${storeId}`);
        return response.data.message; // Success message
    } catch (error) {
        console.error('Error deleting store:', error);
        throw new Error(error.response ? error.response.data.message : 'Error deleting store');
    }
};

// User Management

// Get All Users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/admin/users');
        return response.data.users; // Array of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }
};

// Get Single User
export const getSingleUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/admin/users/${userId}`);
        return response.data.user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }
};

// Create User
export const createUser = async (name, email, address, password, role) => {
    try {
        const response = await axiosInstance.post('/admin/users', { name, email, address, password, role });
        return response.data.user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error.response ? error.response.data.message : 'Error creating user');
    }
};

// Update User
export const updateUser = async (userId, name, email, address, role) => {
    try {
        const response = await axiosInstance.put(`/admin/users/${userId}`, { name, email, address, role });
        return response.data.user; // Updated user details
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(error.response ? error.response.data.message : 'Error updating user');
    }
};

// Delete User
export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/admin/users/${userId}`);
        return response.data.message; // Success message
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error(error.response ? error.response.data.message : 'Error deleting user');
    }
};
