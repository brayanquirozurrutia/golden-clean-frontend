import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Modal, Portal, ActivityIndicator } from 'react-native-paper';
import InputField from '@/components/InputField';
import useClientDashboard from '@/hooks/useClientDashboard';

/**
 * Client dashboard screen.
 * @constructor
 */
const ClientDashboard = () => {
    const {
        addresses,
        loading,
        error,
        selectedAddress,
        setSelectedAddress,
        requestService,
        fetchAddresses,
    } = useClientDashboard();
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [step, setStep] = useState<'input' | 'addresses'>('input');

    const handleConfirmDescription = () => {
        if (!description.trim()) {
            alert('Please provide a description for the service.');
            return;
        }
        setStep('addresses');
        fetchAddresses().then(r => r);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome, Client!</Text>

            {loading && <ActivityIndicator size="large" color="#1565C0" />}

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button
                mode="contained"
                onPress={() => {
                    setModalVisible(true);
                    setStep('input');
                }}
                style={styles.button}
            >
                Request a Service
            </Button>

            {/* Modal for requesting service */}
            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    {step === 'input' ? (
                        <>
                            <Text style={styles.modalTitle}>Enter Service Description</Text>
                            <InputField
                                label="Service Description"
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Enter the service description"
                            />
                            <Button
                                mode="contained"
                                onPress={handleConfirmDescription}
                                style={styles.modalButton}
                            >
                                Next
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text style={styles.modalTitle}>Select an Address</Text>
                            {addresses.map((address) => (
                                <Card
                                    key={address.id}
                                    style={[
                                        styles.card,
                                        selectedAddress === address.id && styles.selectedCard,
                                    ]}
                                    onPress={() => setSelectedAddress(address.id)}
                                >
                                    <Card.Content>
                                        <Text>{address.street}, {address.number}</Text>
                                        <Text>{address.comuna_name}, {address.region_name}</Text>
                                    </Card.Content>
                                </Card>
                            ))}
                            <Button
                                mode="contained"
                                onPress={() => {
                                    setModalVisible(false);
                                    requestService(description).then(() => setDescription(''));
                                }}
                                style={styles.modalButton}
                            >
                                Confirm and Request
                            </Button>
                        </>
                    )}
                </Modal>
            </Portal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1565C0',
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#1E88E5',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 8,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 8,
    },
    selectedCard: {
        borderColor: '#1E88E5',
    },
    modalButton: {
        marginTop: 16,
        backgroundColor: '#1E88E5',
    },
});

export default ClientDashboard;
