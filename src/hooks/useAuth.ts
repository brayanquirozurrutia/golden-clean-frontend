import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '@/services/authService';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Custom hook for authentication.
 *
 * @returns An object containing the login function, loading state, and error state.
 */
const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Define the navigation type based on the stack
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    /**
     * Function to log in a user.
     * @param username The username.
     * @param password The password.
     */
    const login = async (
        username: string,
        password: string
    ) => {
        setLoading(true);
        setError(null);

        try {
            const { refresh, access, role } = await authService.login(username, password);

            // We store the tokens securely
            await AsyncStorage.setItem('refreshToken', refresh);
            await AsyncStorage.setItem('accessToken', access);

            // Redirect based on the role
            if (role === 'CLIENT') {
                navigation.navigate('ClientDashboard');
            } else if (role === 'EMPLOYEE') {
                navigation.navigate('EmployeeDashboard');
            } else {
                setError('Unknown role');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useAuth;
