import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Employee dashboard screen.
 * @constructor
 */
const EmployeeDashboard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, Employee!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
});

export default EmployeeDashboard;
