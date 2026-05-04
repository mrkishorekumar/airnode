import { StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '../../components/core/ThemedView'
import { Text } from 'react-native-paper'

export default function ChatList() {
  return (
   <ThemedView style={{ flex: 1 }}>
    <ThemedView style={styles.header}>
    <Text variant="headlineMedium">Chat List</Text>
    <Text>Welcome to AirNode</Text>
    </ThemedView>
   </ThemedView>
  )
}

const styles = StyleSheet.create({
  header : {paddingHorizontal: 20, marginTop: 70}
})