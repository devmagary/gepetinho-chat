import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tema claro
export const lightTheme = {
  background: '#f5f6f8',
  foreground: '#1a1e26',
  card: '#ffffff',
  cardForeground: '#1a1e26',
  primary: '#2a9d8f',
  primaryForeground: '#ffffff',
  secondary: '#e9ebef',
  secondaryForeground: '#2d3340',
  muted: '#eff0f3',
  mutedForeground: '#6b7280',
  accent: '#e6f5f3',
  accentForeground: '#1d6960',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  border: '#dfe2e8',
  input: '#dfe2e8',
  messageOwn: '#2a9d8f',
  messageOwnForeground: '#ffffff',
  messageOther: '#eff0f3',
  messageOtherForeground: '#1e2532',
  statusOnline: '#22c55e',
  statusConnecting: '#eab308',
  statusOffline: '#6b7280',
  statusError: '#ef4444',
};

// Tema escuro (baseado na imagem do frontend)
export const darkTheme = {
  background: '#0f1419',
  foreground: '#e7e9ea',
  card: '#1a2028',
  cardForeground: '#e7e9ea',
  primary: '#2a9d8f',
  primaryForeground: '#ffffff',
  secondary: '#2d3340',
  secondaryForeground: '#e7e9ea',
  muted: '#1e2732',
  mutedForeground: '#8b98a5',
  accent: '#1a3a36',
  accentForeground: '#2a9d8f',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  border: '#2f3841',
  input: '#2f3841',
  messageOwn: '#2a9d8f',
  messageOwnForeground: '#ffffff',
  messageOther: '#1e2732',
  messageOtherForeground: '#e7e9ea',
  statusOnline: '#22c55e',
  statusConnecting: '#eab308',
  statusOffline: '#6b7280',
  statusError: '#ef4444',
};

const ThemeContext = createContext({
  isDark: true,
  colors: darkTheme,
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = '@chat_gepetinho_theme';

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(true); // Default to dark

  useEffect(() => {
    // Load saved theme preference
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (e) {
      console.log('Error loading theme preference:', e);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
    } catch (e) {
      console.log('Error saving theme preference:', e);
    }
  };

  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
