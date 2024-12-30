# Golden Clean Frontend

Golden Clean is a React Native application designed to connect clients with cleaning service providers. This repository contains the frontend of the app built with React Native, Expo, and TypeScript.

## Features

- User Authentication (Login) using JWT
- Role-based redirection (Client and Employee)
- Modular and scalable codebase
- Responsive design and professional styling
- Integration with a Django REST API backend

## Tech Stack

- **Framework:** React Native
- **Routing and Navigation:** React Navigation
- **UI Components:** React Native Paper
- **HTTP Requests:** Axios
- **State Management:** React Hooks
- **Secure Storage:** AsyncStorage

## Requirements

- Node.js (v16 or higher)
- `pnpm` package manager
- Expo CLI

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/brayanquirozurrutia/golden-clean-frontend.git
   cd golden-clean-frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Update the backend URL in `src/api/axiosInstance.ts`:
   ```typescript
   const axiosInstance = axios.create({
       baseURL: 'http://<your-backend-ip>:8000/api/',
       timeout: 10000,
       headers: {
           'Content-Type': 'application/json',
       },
   });
   ```
   Replace `<your-backend-ip>` with the IP address of your backend server.

4. Start the application:
   ```bash
   pnpm start
   ```

5. Scan the QR code displayed in the terminal using Expo Go (available on Android/iOS).

## Project Structure

```plaintext
.
├── src/
│   ├── api/               # Axios instance
│   ├── components/        # Reusable components (e.g., InputField)
│   ├── hooks/             # Custom hooks (e.g., useAuth)
│   ├── navigation/        # App navigation setup
│   ├── screens/           # Screens (Login, ClientDashboard, EmployeeDashboard)
│   ├── services/          # API service functions (e.g., authService)
│   └── styles/            # Shared styles (optional)
├── App.tsx                # Main app entry point
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Scripts

- **Start the app:**
  ```bash
  pnpm start
  ```

- **Run on Android:**
  ```bash
  pnpm android
  ```

- **Run on iOS:** (requires macOS)
  ```bash
  pnpm ios
  ```

- **Run on Web:**
  ```bash
  pnpm web
  ```

## Environment Variables

Ensure the API URL is correctly set in `src/api/axiosInstance.ts`.

## Authentication Flow

1. Users log in with their username and password.
2. The app sends credentials to the backend (`auth/login/`) and receives JWT tokens (access and refresh).
3. Based on the user's role (`CLIENT` or `EMPLOYEE`), the app redirects them to the appropriate dashboard.

## Author

Developed with ❤️ by [Brayan Nicolas Quiroz Urrutia](https://github.com/brayanquirozurrutia).