import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './theme';
import { PaperProvider } from 'react-native-paper';
import CustomErrorBoundary from './components/wrapper/Custom ErrorBoundary';
import RootStack from './router/RootStack';
import Bootstrap from './components/wrapper/Bootstrap';

export default function Root() {
  const scheme = useColorScheme();

  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <CustomErrorBoundary>
        <Bootstrap>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </Bootstrap>
      </CustomErrorBoundary>
    </PaperProvider>
  );
}
