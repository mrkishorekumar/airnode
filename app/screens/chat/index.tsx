import React, { useState } from 'react'
import { useColorScheme } from 'react-native'
import { Bubble, GiftedChat, IMessage, InputToolbar } from 'react-native-gifted-chat'
import { useHeaderHeight } from '@react-navigation/elements'
import { ThemedView } from '../../components/core/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Menu, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function Chat() {
  const scheme = useColorScheme()
  const colorScheme = scheme === 'dark' ? 'dark' : 'light'
  const theme = useTheme();
  const navigation = useNavigation()
  const headerHeight = useHeaderHeight()

  const [menuVisible, setMenuVisible] = useState(false)

  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello developer 👋',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'John Doe',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ])

  // Send message
  const onSend = (newMessages: IMessage[] = []) => {
    setMessages((prev) => GiftedChat.append(prev, newMessages))

    // Example: fake auto reply
    setTimeout(() => {
      setMessages((prev) =>
        GiftedChat.append(prev, [
          {
            _id: Math.random().toString(),
            text: 'Auto reply 🤖',
            createdAt: new Date(),
            user: { _id: 2 },
          },
        ])
      )
    }, 1000)
  }

  return (
    <ThemedView style={{ flex: 1 }}>

      {/* 🔹 Custom Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <Appbar.Content title="John Doe" />

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item onPress={() => console.log('View Profile')} title="View Profile" />
          <Menu.Item onPress={() => console.log('Clear Chat')} title="Clear Chat" />
          <Menu.Item onPress={() => console.log('Block User')} title="Block User" />
        </Menu>
      </Appbar.Header>

      <SafeAreaView style={{ flex: 1 }}>
        <GiftedChat
          textInputProps={{ autoFocus: true, placeholder: 'Chat with Local LLM!' }}
          colorScheme={colorScheme}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: 1 }}
          renderAvatar={null}
          keyboardAvoidingViewProps={{
            keyboardVerticalOffset: headerHeight,
          }}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: theme.colors.surface,
                borderTopWidth: 0,
              }}
            />
          )}

          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                left: { marginLeft: 0 },
                right: { marginRight: 0 },
              }}
            />
          )}
        />
      </SafeAreaView>
    </ThemedView>
  )
}
