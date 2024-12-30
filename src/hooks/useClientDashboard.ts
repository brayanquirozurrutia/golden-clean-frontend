import { useState } from 'react';
import serviceService from '@/services/serviceService';

interface Address {
    id: number;
    street: string;
    number: string;
    comuna_name: string;
    region_name: string;
}

/**
 * Custom hook for the ClientDashboard.
 */
const useClientDashboard = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

    /**
     * Fetch addresses when requested.
     */
    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const data = await serviceService.getAddresses();
            setAddresses(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Request a new service.
     * @param description The service description.
     */
    const requestService = async (description: string) => {
        if (!selectedAddress) {
            setError('Please select an address.');
            return;
        }

        setLoading(true);
        try {
            await serviceService.requestService({ description, address: selectedAddress });
            alert('Service requested successfully!');
            setSelectedAddress(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        addresses,
        loading,
        error,
        selectedAddress,
        setSelectedAddress,
        requestService,
        fetchAddresses,
    };
};

export default useClientDashboard;
