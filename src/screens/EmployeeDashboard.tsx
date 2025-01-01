import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import useEmployeeDashboard from '@/hooks/useEmployeeDashboard';

/**
 * EmployeeDashboard component.
 */
const EmployeeDashboard = () => {
    const { activeService, countdown, acceptService } = useEmployeeDashboard();

    /**
     * Render a service card.
     * @returns The service card.
     */
    const renderActiveService = () => {
        if (!activeService) {
            return (
                <Text style={styles.noServicesText}>No services available.</Text>
            );
        }

        return (
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.description}>
                        {activeService.description}
                    </Text>
                    <Text style={styles.timerText}>
                        Time remaining: {countdown} seconds
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() => acceptService(activeService.service_id)}
                        style={styles.acceptButton}
                    >
                        Accept
                    </Button>
                </Card.Actions>
            </Card>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Assigned Services</Text>
            {renderActiveService()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E3F2FD',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    noServicesText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    card: {
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
    },
    timerText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#d32f2f'
    },
    acceptButton: {
        backgroundColor: '#1E88E5',
        marginTop: 8,
    },
});

export default EmployeeDashboard;
