import React, { useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import InputField from '@/components/InputField';
import useAuth from '@/hooks/useAuth';

/**
 * Login screen component.
 * @constructor
 */
const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true); // Password visibility
    const { login, loading, error } = useAuth();
    const [localError, setLocalError] = useState<string | null>(null);

    /**
     * Handles the login action with validation.
     */
    const handleLogin = () => {
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        const passwordRegex = /^[A-Za-z0-9@#$%^&+=]{8,}$/;

        // Validate username (email format)
        if (!emailRegex.test(username)) {
            setLocalError('Invalid email format');
            return;
        }

        // Validate password (secure format)
        if (!passwordRegex.test(password)) {
            setLocalError('Password must be at least 8 characters and include valid symbols');
            return;
        }

        // Clear local errors and call the login hook
        setLocalError(null);
        login(username, password).then(r => r);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Welcome to Golden Clean</Text>

                {/* Username field */}
                <InputField
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                    keyboardType="default"
                    leftIconName="account"
                />

                {/* Password field */}
                <InputField
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry={secureTextEntry}
                    leftIconName="lock"
                    rightIconName={secureTextEntry ? 'eye' : 'eye-off'}
                    onRightIconPress={() => setSecureTextEntry(!secureTextEntry)}
                />

                {/* Error Messages */}
                {(localError || error) && (
                    <Text style={styles.errorText}>{localError || error}</Text>
                )}

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1565C0',
        marginBottom: 24,
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#1E88E5',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default LoginScreen;
