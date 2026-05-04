import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import fontFamilies from '../constants/fontFamilies';
import Onboarding from '../screens/onboarding';
import { useAtomValue } from 'jotai';
import { modalListAtomLength } from '../store/modelStore';
import ChatList from '../screens/chatlist';
import Chat from '../screens/chat';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const theme = useTheme();

  const modalListLength = useAtomValue(modalListAtomLength);

  return (
    <Stack.Navigator
      initialRouteName={modalListLength === 0 ? 'Onboarding' : 'Chat'}
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
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
