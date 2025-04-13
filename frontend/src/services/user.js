import axiosInstance from "@/utils/axiosInstance.js";

export const getAllStores = async () => {
    try {
        const response = await axiosInstance.get('/user/stores');
        return response.data;

    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }

}

export const myRating = async () => {
    try {
        const response = await axiosInstance.get('/user/me/ratings');
        return response.data;

    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }

}

export const submitRating = async ({ rating, storeId }) => {
    try {
        const response = await axiosInstance.post(`/user/stores/${storeId}/rate`, {
            rating,
        });
        return response.data;

    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }
}

export const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await axiosInstance.put('/user/me/password', {
            oldPassword,
            newPassword,
        });
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Error resetting password');
    }
}