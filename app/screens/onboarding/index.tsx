import React, { useState, useEffect, Fragment } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, ProgressBar, Badge } from 'react-native-paper';
import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';

const AVAILABLE_MODELS = [
  // --- CATEGORY: GENERAL PURPOSE ---
  {
    id: 'qwen2.5-1.5b',
    category: 'General Purpose',
    name: 'Qwen 2.5 (1.5B)',
    description: 'The best all-rounder. Fast, multilingual, and very smart for its size.',
    size: '1.1 GB',
    minRam: 4,
    url: 'https://modelscope.cn/api/v1/models/qwen/Qwen2.5-1.5B-Instruct-GGUF/repo?Revision=master&FilePath=qwen2.5-1.5b-instruct-q4_k_m.gguf',
  },
  {
    id: 'llama-3.2-3b',
    category: 'General Purpose',
    name: 'Llama 3.2 (3B)',
    description: 'Top-tier reasoning. Best for complex instructions and logic.',
    size: '2.1 GB',
    minRam: 8,
    url: 'https://modelscope.cn/api/v1/models/bartowski/Llama-3.2-3B-Instruct-GGUF/repo?Revision=master&FilePath=Llama-3.2-3B-Instruct-Q4_K_M.gguf',
  },

  // --- CATEGORY: EMOTIONAL SUPPORT & CONVERSATION ---
  {
    id: 'stablelm-zephyr-1.6b',
    category: 'Emotional Support',
    name: 'StableLM Zephyr',
    description: 'DPO-tuned for natural, empathetic dialogue and supportive chat.',
    size: '1.0 GB',
    minRam: 4,
    url: 'https://modelscope.cn/api/v1/models/tiansz/stablelm-2-zephyr-1_6b-GGUF/repo?Revision=master&FilePath=stablelm-2-zephyr-1_6b-Q4_K_M.gguf',
  },

  // --- CATEGORY: CODING & LOGIC ---
  {
    id: 'qwen-coder-1.5b',
    category: 'Coding Assistant',
    name: 'Qwen Coder 1.5B',
    description: 'Specialized in Python, JS, and React. Great for quick coding help.',
    size: '1.1 GB',
    minRam: 4,
    url: 'https://modelscope.cn/api/v1/models/qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF/repo?Revision=master&FilePath=qwen2.5-coder-1.5b-instruct-q4_k_m.gguf',
  },
  {
    id: 'deepseek-coder-1.3b',
    category: 'Coding Assistant',
    name: 'DeepSeek Coder',
    description: 'A legendary small model for clean code generation and debugging.',
    size: '0.9 GB',
    minRam: 4,
    url: 'https://modelscope.cn/api/v1/models/mradermacher/deepseek-coder-1.3b-instruct-GGUF/repo?Revision=master&FilePath=deepseek-coder-1.3b-instruct.Q4_K_M.gguf',
  },

  // --- CATEGORY: ULTRA LIGHT (LOW-END DEVICES) ---
  {
    id: 'smollm2-1.7b',
    category: 'Ultra Light',
    name: 'SmolLM2 (1.7B)',
    description: 'Extremely efficient. Designed to run on almost any modern smartphone.',
    size: '1.05 GB',
    minRam: 3,
    url: 'https://modelscope.cn/api/v1/models/bartowski/SmolLM2-1.7B-Instruct-GGUF/repo?Revision=master&FilePath=SmolLM2-1.7B-Instruct-Q4_K_M.gguf',
  },
  {
    id: 'phi-3.5-mini',
    category: 'Reasoning Specialist',
    name: 'Phi-3.5 Mini',
    description: 'Microsoft’s specialist for math and deep logical analysis.',
    size: '2.4 GB',
    minRam: 8,
    url: 'https://modelscope.cn/api/v1/models/bartowski/Phi-3.5-mini-instruct-GGUF/repo?Revision=master&FilePath=Phi-3.5-mini-instruct-Q4_K_M.gguf',
  }
];

export default function Onboarding({ navigation }: any) {
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deviceRam, setDeviceRam] = useState(0);

  useEffect(() => {
    DeviceInfo.getTotalMemory().then((mem) => setDeviceRam(Math.round(mem / (1024 ** 3))));
  }, []);

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
        begin: (res) => {
          console.log('Download Started. Size:', res.contentLength);
        },
        progress: (res) => {
          // Handle cases where contentLength might be -1 from some servers
          if (res.contentLength > 0) {
            const percent = res.bytesWritten / res.contentLength;
            setProgress(percent);
          }
        },
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        Alert.alert("Success", "AI Model is ready for offline use!", [
          { text: "Start Chatting", onPress: () => navigation.replace('Chat') }
        ]);
      } else {
        throw new Error(`Server returned status code ${result.statusCode}`);
      }

    } catch (error) {
      console.error('Download Error:', error);
      Alert.alert("Error", "Failed to download model. Please check your connection.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Fragment>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Initialize AirNode</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Select an AI model to download. This will be stored 100% locally on your device.
        </Text>
  
        {AVAILABLE_MODELS.map((model) => (
          <Card
            key={model.id}
            style={[styles.card, selectedModel?.id === model.id && styles.selectedCard]}
            onPress={() => setSelectedModel(model)}
          >
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text variant="titleLarge">{model.name}</Text>
                <Badge size={24} style={deviceRam >= model.minRam ? styles.badgePass : styles.badgeWarn}>
                  {model.size}
                </Badge>
              </View>
              <Text variant="bodySmall">{model.description}</Text>
              {deviceRam < model.minRam && (
                <Text style={styles.warningText}>⚠️ May be slow on your {deviceRam}GB device</Text>
              )}
            </Card.Content>
          </Card>
        ))}
  
      </ScrollView>
        <View style={styles.footer}>
          {downloading ? (
            <View>
              <Text style={styles.progressText}>Downloading: {Math.round(progress * 100)}%</Text>
              <ProgressBar progress={progress} color="#6200ee" style={styles.progressBar} />
            </View>
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
        </View>
    </Fragment>
    );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: '#f5f5f5' },
  title: { textAlign: 'center', marginBottom: 10, fontWeight: 'bold', marginTop: 20 },
  subtitle: { textAlign: 'center', marginBottom: 30, color: '#666' },
  card: { marginBottom: 15, elevation: 2 },
  selectedCard: { borderWidth: 2, borderColor: '#6200ee' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  badgePass: { backgroundColor: '#4CAF50' },
  badgeWarn: { backgroundColor: '#FF9800' },
  warningText: { color: '#FF9800', fontSize: 12, marginTop: 5 },
  footer: { marginTop: 'auto', paddingVertical: 20 },
  button: { paddingVertical: 8 },
  progressBar: { height: 10, borderRadius: 5, marginTop: 10 },
  progressText: { textAlign: 'center', marginBottom: 5, fontWeight: 'bold' }
});