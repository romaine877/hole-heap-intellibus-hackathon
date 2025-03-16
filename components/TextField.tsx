import React from "react";
import { Text, TextInput, View } from "react-native";
import { useThemeStore } from "~/store/themeStore";

interface TextFieldProps {
  title: string;
  value: string;
  darkMode: boolean;
  onChangeText: (text: string) => void;
}

export default function TextField({
  title,
  value,
  onChangeText,
  darkMode,
}: TextFieldProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <View className="mb-4 px-4">
      <Text
        className={`mb-2 font-bold ${isDarkMode ? "text-white" : "text-black"}`}
      >
        {title}
      </Text>
      <TextInput
      
        value={value}
        onChangeText={onChangeText}
        className={`border p-2 rounded-md ${
          isDarkMode
            ? "bg-white border-gray-200 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      />
    </View>
  );
}
