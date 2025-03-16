import { View, Text } from "react-native";
import React, { useState } from "react";

import { TextInput } from "react-native";

interface TextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  title: string;
  isError?: boolean;
}

export default function TextField({
  value,
  onChangeText,
  title,
  isError,
}: TextFieldProps) {

    const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="flex-col my-4">
      <Text className="">{title}</Text>

      <TextInput
        placeholder="Email"
        value={value}
        autoCapitalize="none"
        onChangeText={onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={`border-2 ${isError ? "border-red-500" : isFocus ? "" : "border-gray-400"} p-4 rounded-lg bg-gray-200 ${isFocus ? "bg-gray-300" : ""}`}
      />
    </View>
  );
}
