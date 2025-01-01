import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define WebSocket message interface
interface WebSocketMessage {
    type: string;
    [key: string]: any;
}

/**
 * useWebSocket hook.
 * @param url - WebSocket URL.
 * @returns The WebSocket connection.
 */
const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<WebSocketMessage[]>([]);
    const [error, setError] = useState<string | null>(null);

    /**
     * Connect to the WebSocket.
     */
    useEffect(() => {
        const connectWebSocket = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                setError('No token found');
                return;
            }

            // Authenticate the WebSocket connection
            const authUrl = `${url}?token=${token}`;
            const newSocket = new WebSocket(authUrl);

            setSocket(newSocket);

            // Handle WebSocket events
            newSocket.onopen = () => console.log('WebSocket connection opened');
            newSocket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setMessages((prev) => [...prev, data]);
                } catch {
                    console.error('Error parsing WebSocket message');
                }
            };
            newSocket.onerror = () => setError('WebSocket error occurred');
            newSocket.onclose = () => console.log('WebSocket connection closed');

            return () => newSocket.close();
        };

        connectWebSocket().then(r => r);
    }, [url]);

    /**
     * Send a message to the WebSocket.
     * @param message - The message to send.
     * @async
     * @returns The WebSocket connection.
     */
    const sendMessage = (message: WebSocketMessage) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return { socket, messages, sendMessage, error };
};

export default useWebSocket;
