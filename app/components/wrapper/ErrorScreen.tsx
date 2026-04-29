import React from 'react';
import { Text, Button, Icon, useTheme } from 'react-native-paper';
import styles from './style';
import { ThemedView } from '../core/ThemedView';

type ErrorScreenProps = {
  error: Error;
  resetError: () => void;
  goback?: boolean;
};

export default function ErrorScreen({
  error,
  resetError,
  goback,
}: ErrorScreenProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <Icon
        source="alert-circle-outline"
        size={96}
        color={theme.colors.error}
      />

      <Text variant="headlineSmall" style={styles.title}>
        Something went wrong
      </Text>

      <Text
        variant="bodyMedium"
        style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
      >
        {error.message || 'An unexpected error occurred.'}
      </Text>

      <Button mode="contained" onPress={resetError} style={styles.button}>
        {goback ? 'Go Back' : 'Try Again'}
      </Button>
    </ThemedView>
  );
}
