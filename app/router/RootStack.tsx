import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import fontFamilies from '../constants/fontFamilies';
import Onboarding from '../screens/onboarding';

const Stack = createNativeStackNavigator();

export default function RootStack() {

  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontFamily: fontFamilies.Bold,
        },
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} options={{headerTitle : "Welcome!"}} />
    </Stack.Navigator>
  )
}