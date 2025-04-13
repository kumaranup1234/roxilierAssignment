import axiosInstance from "@/utils/axiosInstance.js";

export const getStoreSummary = async () => {
    try {
        const response = await axiosInstance.get('/owner/store');
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }
}

export const getUserRatings = async () => {
    try {
        const response = await axiosInstance.get('/owner/ratings');
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        throw new Error(error.response ? error.response.data.message : 'Error loading data');
    }

}

