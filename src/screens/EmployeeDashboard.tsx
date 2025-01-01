import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import useEmployeeDashboard from '@/hooks/useEmployeeDashboard';

/**
 * EmployeeDashboard component.
 * @constructor
 */
const EmployeeDashboard = () => {
    const { services, acceptService } = useEmployeeDashboard();

    /**
     * Render a service card.
     * @param item - Service item.
     * @returns The service card.
     */
    const renderService = (
        { item }: { item: { service_id: number; description: string } }
    ) => (
        <Card style={styles.card}>
            <Card.Content>
                <Text style={styles.description}>{item.description}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={() => acceptService(item.service_id)}
                    style={styles.acceptButton}
                >
                    Accept
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Assigned Services</Text>
            {services.length === 0 ? (
                <Text style={styles.noServicesText}>No services available.</Text>
            ) : (
                <FlatList
                    data={services}
                    keyExtractor={(item) => item.service_id.toString()}
                    renderItem={renderService}
                />
            )}
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
    acceptButton: {
        backgroundColor: '#1E88E5',
        marginTop: 8,
    },
});

export default EmployeeDashboard;
