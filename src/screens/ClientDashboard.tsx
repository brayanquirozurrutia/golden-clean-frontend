import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Client dashboard screen.
 * @constructor
 */
const ClientDashboard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, Client!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1565C0',
    },
});

export default ClientDashboard;
