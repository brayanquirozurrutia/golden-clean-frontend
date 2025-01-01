import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// Define location data interface
interface LocationData {
    lat: number;
    lng: number;
}

/**
 * useEmployeeLocation hook.
 * @param socket - WebSocket connection.
 * @returns The employee's location.
 */
const useEmployeeLocation = (
    socket: WebSocket | null
): LocationData | null => {
    const [location, setLocation] = useState<LocationData | null>(null);

    /**
     * Get the current location.
     * @returns The current location.
     * @async
     */
    const getCurrentLocation = async (): Promise<LocationData | null> => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return null;

            const locationData = await Location.getCurrentPositionAsync({});
            return {
                lat: locationData.coords.latitude,
                lng: locationData.coords.longitude,
            };
        } catch {
            return null;
        }
    };

    /**
     * Send the location to the WebSocket.
     */
    const sendLocationToSocket = async () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const currentLocation = await getCurrentLocation();
            if (currentLocation) {
                setLocation(currentLocation);
                socket.send(
                    JSON.stringify({
                        type: 'update_location',
                        lat: currentLocation.lat,
                        lng: currentLocation.lng,
                    })
                );
            }
        }
    };

    /**
     * Send the location to the WebSocket on open and every 30 seconds.
     */
    useEffect(() => {
        const handleOpen = () => sendLocationToSocket();

        if (socket) {
            socket.addEventListener('open', handleOpen);
        }

        const interval = setInterval(() => {
            sendLocationToSocket().then(r => r);
        }, 30000);

        return () => {
            socket?.removeEventListener('open', handleOpen);
            clearInterval(interval);
        };
    }, [socket]);

    return location;
};

export default useEmployeeLocation;
