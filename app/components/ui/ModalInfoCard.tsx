import { StyleSheet } from 'react-native';
import React from 'react';
import { useAtom } from 'jotai';
import { Badge, Card, Chip, Text, useTheme } from 'react-native-paper';
import { ThemedView } from '../core/ThemedView';
import { Modal } from '../../types/Modal';
import { deviceInfoAtom } from '../../store/deviceInfoStore';

export default function ModalInfoCard(
  prop: Modal & {
    selectedModelId: string | null;
    setSelectedModel: (model: Modal) => void;
  },
) {
  const [deviceInfo] = useAtom(deviceInfoAtom);
  const deviceRam = deviceInfo.ram;
  const theme = useTheme();

  return (
    <Card
      key={prop.id}
      style={[
        styles.card,
        prop.selectedModelId === prop.id && [
          styles.selectedCard,
          { borderColor: theme.colors.primary },
        ],
      ]}
      onPress={() => prop.setSelectedModel(prop)}
    >
      <Card.Content>
        <ThemedView style={styles.cardHeader}>
          <Text variant="titleLarge">{prop.name}</Text>
          <Badge
            size={24}
            style={
              deviceRam >= prop.minRam
                ? [styles.badgePass, { backgroundColor: theme.colors.success }]
                : [styles.badgeWarn, { backgroundColor: theme.colors.warning }]
            }
          >
            {prop.size}
          </Badge>
        </ThemedView>
        <Text variant="bodySmall" style={styles.descriptionText}>
          {prop.description}
        </Text>
        {deviceRam < prop.minRam && (
          <Text style={[styles.warningText, { color: theme.colors.warning }]}>
            ⚠️ May be slow on your {deviceRam}GB device
          </Text>
        )}
        <ThemedView style={styles.chipContainer}>
          {prop?.capabilities?.map((capability, index) => (
            <Chip
              mode="outlined"
              icon="information"
              key={index}
              style={styles.chip}
            >
              {capability}
            </Chip>
          ))}
        </ThemedView>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 15, borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderWidth: 2 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  warningText: { fontSize: 12, marginTop: 10 },
  badgePass: { paddingHorizontal: 8 },
  badgeWarn: { paddingHorizontal: 8 },
  descriptionText: { marginTop: 5, width: '90%' },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  chip: { marginRight: 6, marginBottom: 6 },
});
