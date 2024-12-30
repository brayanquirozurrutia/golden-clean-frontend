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
    const response = await axiosInstance.post('auth/login/', {
        username,
        password,
    });
    return response.data;
};

export default {
    login,
};
