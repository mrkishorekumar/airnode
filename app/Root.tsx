import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from './theme';
import { PaperProvider } from 'react-native-paper';
import CustomErrorBoundary from './components/wrapper/Custom ErrorBoundary';
import RootStack from './router/RootStack';

export default function Root() {

  const scheme = useColorScheme();

  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <CustomErrorBoundary>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </CustomErrorBoundary>
    </PaperProvider>
  )
}