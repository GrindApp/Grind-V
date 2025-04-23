import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Pressable, Animated } from 'react-native';
import { Search, X } from 'lucide-react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
  placeholder: string;
  onSubmit?: () => void;
  autoFocus?: boolean;
};

const SearchBar = ({ 
  value, 
  onChange, 
  onClear, 
  placeholder,
  onSubmit,
  autoFocus = false
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="px-4 py-2">
      <Pressable 
        className={`flex-row items-center bg-neutral-800 rounded-xl px-4 py-3 border ${
          isFocused ? 'border-blue-500' : 'border-transparent'
        } shadow-sm shadow-black`}
      >
        <Search 
          color={isFocused || value.length > 0 ? "#3b82f6" : "#6b7280"} 
          size={18} 
          strokeWidth={2.5}
        />
        
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          className="text-white flex-1 ml-3 font-medium text-base"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          selectionColor="#3b82f6"
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {value.length > 0 && (
          <TouchableOpacity 
            onPress={onClear}
            className="bg-neutral-700 rounded-full p-1 active:bg-neutral-600"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X color="#d1d5db" size={16} strokeWidth={2.5} />
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  );
};

export default SearchBar;