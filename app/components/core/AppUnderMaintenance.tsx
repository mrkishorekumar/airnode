import React from 'react';
import { Surface, Text, Button, useTheme } from 'react-native-paper';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { ThemedView } from './ThemedView';
import { StyleSheet } from 'react-native';

type MaintenanceScreenProps = {
  onRetry?: () => void;
};

const AppUnderMaintenance: React.FC<MaintenanceScreenProps> = ({ onRetry }) => {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <Surface style={styles.surface} elevation={2}>
        <MaterialDesignIcons
          name="tools"
          size={70}
          color={theme.colors.primary}
          style={styles.icon}
        />

        <Text variant="headlineMedium" style={styles.title}>
          We’ll be right back
        </Text>

        <Text
          variant="bodyMedium"
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          Our app is currently undergoing scheduled maintenance. Thanks for your
          patience.
        </Text>

        {onRetry && (
          <Button mode="contained" onPress={onRetry} style={styles.button}>
            Try again
          </Button>
        )}
      </Surface>
    </ThemedView>
  );
};

export default AppUnderMaintenance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  surface: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  loader: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
  icon: {
    marginBottom: 24,
  },
});
