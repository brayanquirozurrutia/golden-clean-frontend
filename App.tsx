import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from '@/navigation/AppNavigator';
import { DefaultTheme as PaperTheme } from 'react-native-paper';
import { DefaultTheme as NavigationTheme } from '@react-navigation/native';
import merge from 'deepmerge';

// Merge themes for Paper and Navigation
const CombinedTheme = merge(NavigationTheme, PaperTheme);

const App = () => {
    return (
        <PaperProvider theme={CombinedTheme}>
            <NavigationContainer theme={CombinedTheme}>
                <AppNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
