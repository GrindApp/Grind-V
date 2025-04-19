// components/SearchBar.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
  placeholder: string;
};

const SearchBar = ({ value, onChange, onClear, placeholder }: Props) => {
  return (
    <View className="relative">
      <View className="flex-row items-center bg-neutral-800 rounded-full px-4 py-3">
        <Search color="gray" size={20} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          className="text-white flex-1 ml-2"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <X color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
