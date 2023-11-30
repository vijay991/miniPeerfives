const API_BASE_URL = 'http://localhost:9002'; // Update with your backend server URL

const api = {
    get: async (url) => {
        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },
    // Add other HTTP methods (post, put, delete, etc.) as needed
};

export default api;
