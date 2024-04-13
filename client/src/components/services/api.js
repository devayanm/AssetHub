import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

export const userApi = {
    loginUser: async (userData) => {
        try {
            const response = await api.post('/users/login', userData);

            console.log('Login Response:', response); // Log the response

            const { data } = response || {};
            const { accessToken, refreshToken } = data.data || {}; // Access accessToken and refreshToken from response.data.data

            if (!accessToken || !refreshToken) {
                throw new Error('Access token or refresh token not provided');
            }

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            return data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw new Error('Failed to login: ' + error.message);
            }
        }
    },


    registerUser: async (userData) => {
        try {
            const response = await api.post('/users/register', userData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },


    logoutUser: async () => {
        try {
            // Get the access token from local storage
            const accessToken = localStorage.getItem('accessToken');

            // Check if access token is available
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            // Remove tokens from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // Send the logout request with the access token in the Authorization header
            const response = await api.post('/users/logout', {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error logging out:', error.message);
            throw new Error('Logout failed');
        }
    },


    refreshAccessToken: async () => {
        try {
            const response = await api.post('/users/refresh-token', {
                refreshToken: localStorage.getItem('refreshToken'),
            });

            localStorage.setItem('accessToken', response.data.accessToken);

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    changeCurrentPassword: async (passwordData) => {
        try {
            const response = await api.post('/users/change-password', passwordData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getCurrentUser: async () => {
        try {
            // Get the access token from local storage
            const accessToken = localStorage.getItem('accessToken');

            // Check if access token is available
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            // Make the GET request to fetch the current user data
            const response = await api.get('/users/current-user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Return the user data from the response
            return response.data;
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data) {
                // If the server responded with an error message
                throw error.response.data;
            } else {
                // If the error is not from the server
                throw new Error('Failed to fetch user data: ' + error.message);
            }
        }
    },


    updateAccountDetails: async (accountData) => {
        try {
            const response = await api.patch('/users/update-account', accountData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    updateUserAvatar: async (avatarData) => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatarData);

            const response = await api.patch('/users/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    updateUserCoverImage: async (coverImageData) => {
        try {
            const formData = new FormData();
            formData.append('coverImage', coverImageData);

            const response = await api.patch('/users/cover-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export const goldApi = {
    getGoldAssets: async () => {
        try {
            const response = await api.get('/gold/assets');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export const cryptoApi = {
    getCryptocurrencyAssets: async () => {
        try {
            const response = await api.get('/cryptocurrency/assets');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export const vehicleApi = {
    registerVehicle: async (vehicleData) => {
        try {
            const response = await api.post('/vehicles/register', vehicleData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getVehicleById: async (vehicleId) => {
        try {
            const response = await api.get(`/vehicles/${vehicleId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getVehicles: async () => {
        try {
            const response = await api.get('/vehicles');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    rentVehicle: async (rentalData) => {
        try {
            const response = await api.post('/vehicles/rent', rentalData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    returnVehicle: async (returnData) => {
        try {
            const response = await api.post('/vehicles/return', returnData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default api;