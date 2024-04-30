import axios from 'axios';

const API_BASE_URLS = [
    'http://localhost:8000/api/v1',
    'https://assethubbackend.onrender.com/api/v1'
];

const checkBackendUrlAccessibility = async (url) => {
    try {
        const response = await axios.get(`${url}/users/help`);
        if (response.status === 200 && response.data.message === 'This is the help message for your API.') {
            console.log(`Backend URL ${url} is accessible.`);
            return true;
        } else {
            throw new Error(`Backend URL ${url} returned unexpected response.`);
        }
    } catch (error) {
        console.error(`Error accessing backend URL ${url}: ${error.message}`);
        return false;
    }
};

const getBackendUrl = async () => {
    try {
        for (const url of API_BASE_URLS) {
            if (await checkBackendUrlAccessibility(url)) {
                console.log('Using backend URL:', url);
                return url;
            }
        }
        throw new Error('No accessible backend URL found.');
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

const initializeApi = async () => {
    try {
        const backendUrl = await getBackendUrl();
        const api = axios.create({
            baseURL: backendUrl,
        });
        return api;
    } catch (error) {
        console.error('Error initializing API:', error.message);
        throw error;
    }
};

const api = await initializeApi();

export const userApi = {
    loginUser: async (userData) => {
        try {
            const response = await api.post('/users/login', userData);

            console.log('Login Response:', response); 

            const { data } = response || {};
            const { accessToken, refreshToken } = data.data || {}; 

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
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

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
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found');
            }
            const response = await api.get('/users/current-user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
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

export const buysellApi = {
    getBuySellRealEstateAssets: async () => {
        try {
            const response = await api.get('/buy-sell/real-estate/assets');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getBuySellVehicleAssets: async () => {
        try {
            const response = await api.get('/buy-sell/vehicles/assets');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getBuySellPropertyAssets: async () => {
        try {
            const response = await api.get('/buy-sell/properties/assets');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default api;