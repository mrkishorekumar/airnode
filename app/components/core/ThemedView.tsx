import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from 'react-native-paper';

export const ThemedView: React.FC<{
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}> = ({ style, children }) => {
  const theme = useTheme();
  return (
    <View style={[{ backgroundColor: theme.colors.surface }, style]}>
      {children}
    </View>
  );
};
