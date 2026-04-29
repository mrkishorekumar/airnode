import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, ProgressBar, useTheme } from 'react-native-paper';
import RNFS from 'react-native-fs';
import { ThemedView } from '../../components/core/ThemedView';
import ModalInfoCard from '../../components/ui/ModalInfoCard';
import { useAtom } from 'jotai';
import { downloadedModelsAtom } from '../../store/modelStore';

export default function Onboarding({ navigation }: any) {
  const theme = useTheme();
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState<number | null>(null);
  const getModalListFromState = useAtom(downloadedModelsAtom)[0];

  useEffect(() => {
    return () => {
      if (jobId) {
        RNFS.stopDownload(jobId);
      }
    };
  }, [jobId]);

  const handleCancel = () => {
    if (jobId) {
      RNFS.stopDownload(jobId);
      setJobId(null);
      setDownloading(false);
      setProgress(0);
      Alert.alert('Cancelled', 'The download was stopped.');
    }
  };

  const handleDownload = async () => {
    if (!selectedModel) return;

    const modelDir = `${RNFS.DocumentDirectoryPath}/models`;
    const downloadDest = `${modelDir}/${selectedModel.id}.gguf`;

    setDownloading(true);
    setProgress(0);

    try {
      // 1. Ensure the models directory exists
      const exists = await RNFS.exists(modelDir);
      if (!exists) {
        await RNFS.mkdir(modelDir);
      }

      // 2. Start the direct download
      const download = RNFS.downloadFile({
        fromUrl: selectedModel.url,
        toFile: downloadDest,
        begin: res => {
          setJobId(res.jobId); // Capture the jobId here
          console.log('Download Started. Size:', res.contentLength);
        },
        progress: res => {
          // Handle cases where contentLength might be -1 from some servers
          if (res.contentLength > 0) {
            const percent = res.bytesWritten / res.contentLength;
            setProgress(percent);
          }
        },
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        Alert.alert('Success', 'AI Model is ready for offline use!', [
          { text: 'Start Chatting', onPress: () => navigation.replace('Chat') },
        ]);
      } else {
        throw new Error(`Server returned status code ${result.statusCode}`);
      }
    } catch (error: any) {
      // If error is caused by stopDownload, it's not a real failure
      if (error.message === 'Download has been aborted') return;
      console.error('Download Error:', error);
      Alert.alert(
        'Error',
        'Failed to download model. Please check your connection.',
      );
    } finally {
      setDownloading(false);
      setJobId(null);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Initialize AirNode
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          Select an AI model to download. This will be stored 100% locally.
        </Text>
      </ThemedView>

      <ScrollView
        bounces={false}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.surface },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {getModalListFromState.map(model => (
          <ModalInfoCard
            key={model.id}
            {...model}
            selectedModelId={selectedModel?.id || null}
            setSelectedModel={setSelectedModel}
          />
        ))}
      </ScrollView>

      <ThemedView style={styles.footer}>
        {downloading ? (
          <ThemedView>
            <Text style={styles.progressText}>
              Downloading: {Math.round(progress * 100)}%
            </Text>
            <ProgressBar
              progress={progress}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Button
              mode="text"
              onPress={handleCancel}
              textColor={theme.colors.error}
              style={{ marginTop: 10 }}
            >
              Cancel Download
            </Button>
          </ThemedView>
        ) : (
          <Button
            mode="contained"
            disabled={!selectedModel}
            onPress={handleDownload}
            style={styles.button}
          >
            Download & Setup
          </Button>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, flexGrow: 1, paddingBottom: 40 },
  header: { paddingHorizontal: 20, marginTop: 70 },
  title: { textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  subtitle: { textAlign: 'center', marginBottom: 30 },
  card: {
    marginBottom: 15,
    elevation: 1,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: { borderWidth: 2, borderColor: '#6200ee' },
  warningText: { color: '#FF9800', fontSize: 12, marginTop: 10 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  badgePass: { backgroundColor: '#4CAF50', paddingHorizontal: 8 },
  badgeWarn: { backgroundColor: '#FF9800', paddingHorizontal: 8 },
  footer: {
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  button: { paddingVertical: 8 },
  progressBar: { height: 10, borderRadius: 5, marginTop: 10 },
  progressText: { textAlign: 'center', fontWeight: 'bold' },
  descriptionText: { marginTop: 5, width: '90%' },
});
