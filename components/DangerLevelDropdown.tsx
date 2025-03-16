import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "~/store/themeStore";

interface DangerLevelDropdownProps {
  onSelect: (level: number) => void;
  selectedLevel: number;
}

export function DangerLevelDropdown({ onSelect, selectedLevel }: DangerLevelDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useThemeStore();

  return (
    <View className="w-full px-8">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className={`flex-row justify-between items-center p-4 border rounded-lg ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
        }`}
      >
        <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Danger alert levels - {selectedLevel}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      </TouchableOpacity>

      {isOpen && (
        <View className={`mt-2 border rounded-lg ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
        }`}>
          <Text className={`p-4 text-lg font-semibold ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Alert me for this danger level and above:
          </Text>
          
          {[1, 2, 3, 4, 5].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => {
                onSelect(level);
                setIsOpen(false);
              }}
              className={`p-4 flex-row items-center ${
                level === selectedLevel
                  ? isDarkMode
                    ? 'bg-blue-900'
                    : 'bg-blue-100'
                  : ''
              }`}
            >
              <Text className={`text-lg ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Level {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
} 