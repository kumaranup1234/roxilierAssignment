import axiosInstance from "../utils/axiosInstance.js";

export const signupUser = async (name, email, address, password) => {
    try {
        const response = await axiosInstance.post('/auth/register', {
            name,
            email,
            address,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Signup failed');
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password
        })
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Login failed');
    }
}
