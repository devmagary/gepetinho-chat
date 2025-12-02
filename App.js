import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

// Telas
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { isDark, colors } = useTheme();
  
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={colors.background} 
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
