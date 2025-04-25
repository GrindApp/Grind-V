import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
};

type ChatDetailProps = {
  route?: {
    params: {
      name: string;
      image: string;
      status: string;
    };
  };
  navigation?: any;
};

// Sample data
const sampleMessages: Message[] = [
  {
    id: '1',
    text: 'Hey, are you going to the gym today?',
    sender: 'other',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '2',
    text: 'Yes, planning to go around 6pm. Want to join?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
    status: 'read',
  },
  {
    id: '3',
    text: `Perfect! I'll meet you there. Let's do a leg workout today.`,
    sender: 'other',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
  },
  {
    id: '4',
    text: `Sounds good! I've been wanting to work on squats.`,
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'read',
  },
  {
    id: '5',
    text: 'Great, I can help you with your form. See you at 6!',
    sender: 'other',
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
  {
    id: '6',
    text: 'Thanks! I appreciate that. See you soon!',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    status: 'delivered',
  },
];

// Utility functions
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    });
  }
};

// Components
const ChatHeader = ({ contact, onBack }: { contact: any; onBack: () => void }) => (
  <View className="flex-row items-center px-4 py-3 border-b border-primary bg-primary">
    <TouchableOpacity 
      className="mr-3"
      onPress={onBack}
    >
      <Ionicons name="chevron-back" size={24} color="white" />
    </TouchableOpacity>
    
    <Image 
      source={{ uri: contact.image }} 
      className="w-10 h-10 rounded-full"
    />
    
    <View className="flex-1 ml-3">
      <Text className="text-white font-medium text-base">
        {contact.name}
      </Text>
      <Text className="text-green-500 text-xs">
        {contact.status === 'online' ? 'Online' : contact.status}
      </Text>
    </View>
    
    <TouchableOpacity className="p-2">
      <Feather name="phone" size={20} color="white" />
    </TouchableOpacity>
    
    <TouchableOpacity className="p-2 ml-2">
      <Feather name="more-vertical" size={20} color="white" />
    </TouchableOpacity>
  </View>
);

const DateHeader = ({ date }: { date: any }) => (
  <View className="py-2 items-center">
    <Text className="text-secondary text-xs bg-primary px-3 py-1 rounded-full">
      {date}
    </Text>
  </View>
);

const MessageStatus = ({ status }: { status: string }) => {
  if (!status) return null;
  
  const iconMap: { [key: string]: JSX.Element } = {
    sent: <Ionicons name="checkmark" size={16} color="#777" />,
    delivered: <Ionicons name="checkmark-done" size={16} color="#777" />,
    read: <Ionicons name="checkmark-done" size={16} color="#3b82f6" />
  };
  
  return iconMap[status] || "";
};

const MessageBubble = ({ message, contactImage }: { message: Message; contactImage: string }) => (
  <View 
    className={`flex-row my-1 mx-3 ${
      message.sender === 'user' ? 'justify-end' : 'justify-start'
    }`}
  >
    {message.sender === 'other' && (
      <Image 
        source={{ uri: contactImage }} 
        className="w-8 h-8 rounded-full mr-2 mt-1"
      />
    )}
    
    <View className="max-w-[75%] flex-row">
      <View 
        className={`px-4 py-2.5 rounded-2xl ${
          message.sender === 'user' 
            ? 'bg-accent rounded-tr-none' 
            : 'bg-primary rounded-tl-none'
        }`}
      >
        <Text className="text-white">
          {message.text}
        </Text>
        
        <View className="flex-row items-center justify-end mt-1">
          <Text className="text-xs text-gray-300 mr-1">
            {formatTime(message.timestamp)}
          </Text>
          {message.sender === 'user' && <MessageStatus status={message.status || ''} />}
        </View>
      </View>
    </View>
  </View>
);

const TypingIndicator = ({ isVisible, contactImage }: { isVisible: boolean; contactImage: string }) => {
  if (!isVisible) return null;
  
  return (
    <View className="flex-row items-center mx-4 mb-2">
      <Image 
        source={{ uri: contactImage }} 
        className="w-8 h-8 rounded-full mr-2"
      />
      <View className="bg-primary px-4 py-3 rounded-2xl rounded-tl-none">
        <View className="flex-row items-center space-x-1">
          <View className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
          <View className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <View className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </View>
      </View>
    </View>
  );
};

const ChatInput = ({ inputText, setInputText, handleSend }: { inputText: string; setInputText: (text: string) => void; handleSend: () => void }) => (
  <View className="flex-row items-center px-4 py-2 border-t border-primary bg-black">
    <TouchableOpacity className="p-2 mr-2">
      <Feather name="plus-circle" size={24} color="#777" />
    </TouchableOpacity>
    
    <View className="flex-1 flex-row items-center bg-primary rounded-full px-4 py-2">
      <TextInput
        className="flex-1 text-white"
        placeholder="Type a message..."
        placeholderTextColor="#777"
        value={inputText}
        onChangeText={setInputText}
        multiline
        maxLength={500}
      />
      
      <TouchableOpacity className="ml-2 p-1">
        <Feather name="smile" size={20} color="#777" />
      </TouchableOpacity>
    </View>
    
    <TouchableOpacity 
      className={`p-2 ml-2 ${!inputText.trim() ? 'opacity-50' : ''}`}
      onPress={handleSend}
      disabled={!inputText.trim()}
    >
      <View className="bg-accent w-10 h-10 rounded-full items-center justify-center">
        <Feather name="send" size={18} color="white" />
      </View>
    </TouchableOpacity>
  </View>
);

// Main component
const ChatDetailScreen: React.FC<ChatDetailProps> = ({ route }) => {
  const navigation = useNavigation();
  // If no route params are provided, use default values
  const contact = route?.params || {
    name: 'Rajesh Shukla',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'online',
  };

  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        scrollToBottom();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Simulate typing indicator
    const typingTimeout = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    }, 2000);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      clearTimeout(typingTimeout);
    };
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate message being delivered
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );
    }, 1000);

    // Simulate reply after 2 seconds
    setTimeout(() => {
      // First, mark the message as read
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' } 
            : msg
        )
      );
      
      // Then simulate typing
      setIsTyping(true);
      
      // After "typing", add the reply
      setTimeout(() => {
        setIsTyping(false);
        
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getRandomReply(),
          sender: 'other',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, replyMessage]);
      }, 2000);
    }, 2000);
  };

  const getRandomReply = () => {
    const replies = [
      "That's great! Looking forward to our workout.",
      "Perfect! Don't forget to bring your water bottle.",
      "Awesome! I have some new exercises we can try.",
      "Cool! I'll be there on time.",
      "Sounds good! Let's crush this workout."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const showDateHeader = index === 0 || 
      formatDate(item.timestamp) !== formatDate(messages[index - 1].timestamp);
    
    return (
      <>
        {showDateHeader && <DateHeader date={formatDate(item.timestamp)} />}
        <MessageBubble message={item} contactImage={contact.image} />
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['right', 'left', 'top']}>
      <StatusBar barStyle="light-content" />
      
      <ChatHeader 
        contact={contact} 
        onBack={() => navigation.goBack()} 
      />
      
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 15 }}
          onContentSizeChange={scrollToBottom}
          showsVerticalScrollIndicator={false}
        />
        
        <TypingIndicator 
          isVisible={isTyping} 
          contactImage={contact.image} 
        />
        
        <ChatInput 
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;