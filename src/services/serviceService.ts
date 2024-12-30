import axiosInstance from '@/api/axiosInstance';

interface Address {
    id: number;
    street: string;
    number: string;
    comuna_name: string;
    region_name: string;
}

interface ServiceRequest {
    description: string;
    address: number;
}

interface ServiceResponse {
    id: number;
    client: number;
    description: string;
    address: Address;
    status: string;
    created_at: string;
    updated_at: string;
}

/**
 * Fetch the addresses of the current user.
 */
const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await axiosInstance.get('user/addresses/', {
            requiresAuth: true,
        });
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.detail || 'Failed to fetch addresses. Please try again.';
        throw new Error(errorMessage);
    }
};

/**
 * Request a new service.
 * @param data Service request data.
 */
const requestService = async (data: ServiceRequest): Promise<ServiceResponse> => {
    try {
        const response = await axiosInstance.post('service/request/', data, {
            requiresAuth: true,
        });
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.detail || 'Failed to request service. Please try again.';
        throw new Error(errorMessage);
    }
};

export default {
    getAddresses,
    requestService,
};
