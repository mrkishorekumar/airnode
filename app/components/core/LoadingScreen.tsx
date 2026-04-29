import { ActivityIndicator, Text } from 'react-native-paper';
import React from 'react';
import { ThemedView } from './ThemedView';
import { StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <ThemedView style={styles.loadingContainer}>
      <ActivityIndicator animating size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});
