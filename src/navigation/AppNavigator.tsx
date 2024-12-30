import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/screens/LoginScreen';
import ClientDashboard from '@/screens/ClientDashboard';
import EmployeeDashboard from '@/screens/EmployeeDashboard';
import { RootStackParamList } from '@/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * App navigator component.
 * @constructor
 */
const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ClientDashboard" component={ClientDashboard} />
            <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
