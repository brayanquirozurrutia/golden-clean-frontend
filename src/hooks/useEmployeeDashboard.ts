import { useEffect } from 'react';
import useWebSocket from './useWebSocket';
import useEmployeeLocation from './useEmployeeLocation';

// Define WebSocket message interface
interface WebSocketMessage {
    type: string;
    service_id?: number;
    description?: string;
    [key: string]: any;
}

/**
 * useEmployeeDashboard hook.
 */
const useEmployeeDashboard = () => {
    const { socket, messages, sendMessage, error } = useWebSocket('ws://192.168.0.200:8000/ws/employees/');
    const location = useEmployeeLocation(socket);

    // Type guard to filter only valid service notifications
    const isServiceNotification = (
        message: WebSocketMessage
    ): message is { type: 'service_notification'; service_id: number; description: string } =>
        message.type === 'service_notification' &&
        typeof message.service_id === 'number' &&
        typeof message.description === 'string';

    const services = messages.filter(isServiceNotification);

    // Accept a service
    const acceptService = (service_id: number) => {
        sendMessage({ type: 'accept_service', service_id });
    };

    // Log WebSocket errors
    useEffect(() => {
        if (error) {
            console.error('WebSocket error:', error);
        }
    }, [error]);

    return { services, acceptService, location };
};

export default useEmployeeDashboard;
