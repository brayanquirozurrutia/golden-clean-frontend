import 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        requiresAuth?: boolean;
    }
}
