import { useEffect, useState, useRef } from 'react';
import { Audio } from 'expo-av';
import useWebSocket from './useWebSocket';
import useEmployeeLocation from './useEmployeeLocation';

// Define WebSocket message interface
interface WebSocketMessage {
    type: string;
    service_id?: number;
    description?: string;
    [key: string]: any;
}

// Define service notification interface
interface ServiceNotification {
    type: 'service_notification';
    service_id: number;
    description: string;
}

/**
 * useEmployeeDashboard hook.
 */
const useEmployeeDashboard = () => {
    const {
        socket,
        messages,
        sendMessage,
        error
    } = useWebSocket('ws://192.168.0.200:8000/ws/employees/');

    const location = useEmployeeLocation(socket);

    // Queue of pending services
    const [pendingServices, setPendingServices] = useState<ServiceNotification[]>([]);

    // Service currently displayed on screen
    const [activeService, setActiveService] = useState<ServiceNotification | null>(null);

    // Status for the countdown (in seconds).
    const [countdown, setCountdown] = useState(15);

    // Reference for the countdown interval
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Reference for the sound object
    const soundRef = useRef<Audio.Sound | null>(null);

    /**
     * Play alert sound looped
     */
    async function playAlertSoundLooped() {
        try {
            // If there's already an instance, stop and unload it (for safety).
            if (soundRef.current) {
                await stopAlertSound();
            }

            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/alert_sound.mp3')
            );

            // Start looping
            await sound.setIsLoopingAsync(true);

            // Play the sound
            await sound.playAsync();

            // Save the reference
            soundRef.current = sound;

        } catch (err) {
            console.error('Error reproduciendo sonido:', err);
        }
    }

    /**
     * Stop alert sound
     */
    async function stopAlertSound() {
        if (soundRef.current) {
            try {
                await soundRef.current.pauseAsync();
                await soundRef.current.setIsLoopingAsync(false);
                await soundRef.current.stopAsync();
                await soundRef.current.unloadAsync();
            } catch (err) {
                console.error('Error deteniendo sonido:', err);
            } finally {
                // Cleanup
                soundRef.current = null;
            }
        }
    }

    // Type guard to check if a message is a ServiceNotification
    const isServiceNotification = (
        message: WebSocketMessage
    ): message is ServiceNotification =>
        message.type === 'service_notification' &&
        typeof message.service_id === 'number' &&
        typeof message.description === 'string';

    /**
     * Every time a message arrives, we filter those of type "service_notification".
     * We add them to the pending queue.
     */
    useEffect(() => {
        const newServiceNotifications = messages.filter(isServiceNotification);
        if (newServiceNotifications.length > 0) {
            setPendingServices((prev) => [...prev, ...newServiceNotifications]);
        }
    }, [messages]);

    /**
     * useEffect to handle the service queue.
     *  - If there's no active service and the pending queue is not empty,
     *    we take the first from the queue, activate it, and play the alert.
     */
    useEffect(() => {
        if (!activeService && pendingServices.length > 0) {

            // Remove the first from the queue
            const [nextService, ...rest] = pendingServices;

            setPendingServices(rest);
            setActiveService(nextService);
            setCountdown(15);

            // Start the sound loop
            playAlertSoundLooped().then();
        }
    }, [pendingServices, activeService]);

    /**
     * useEffect to handle the countdown.
     */
    useEffect(() => {
        if (activeService) {
            countdownIntervalRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        // Time expired and the service was not accepted
                        handleTimeout();
                        return 15;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // Clear the interval when the component unmounts or the active service changes
        return () => {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
        };
    }, [activeService]);

    /**
     * handleTimeout: called when the countdown reaches zero.
     */
    const handleTimeout = () => {
        // Dismiss the active service
        setActiveService(null);
        setCountdown(15);

        // Stop the sound
        stopAlertSound().catch((err) => console.error(err));
    };

    /**
     * acceptService: called when the employee accepts a service.
     * @param service_id The service ID.
     */
    const acceptService = (service_id: number) => {
        sendMessage({ type: 'accept_service', service_id });
        setActiveService(null);
        setCountdown(15);

        // Stop the sound
        stopAlertSound().catch((err) => console.error(err));
    };

    // Log WebSocket errors
    useEffect(() => {
        if (error) {
            console.error('WebSocket error:', error);
        }
    }, [error]);

    return {
        location,
        activeService,
        countdown,
        acceptService,
    };
};

export default useEmployeeDashboard;
