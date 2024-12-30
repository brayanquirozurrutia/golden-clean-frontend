import axiosInstance from '@/api/axiosInstance';

interface LoginResponse {
    refresh: string;
    access: string;
    role: string;
}

/**
 * Function to log in a user.
 * @param username The username.
 * @param password The password.
 */
const login = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post('auth/login/', { username, password });
        return response.data;
    } catch (error: any) {
        // Return the error message from the backend if available, otherwise a generic error
        const errorMessage =
            error.response?.data?.detail || 'An unexpected error occurred. Please try again.';
        throw new Error(errorMessage);
    }
};

export default {
    login,
};
