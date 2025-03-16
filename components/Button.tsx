import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useThemeStore } from "~/store/themeStore";

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  onPress,
  className = "",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`p-4 ${
        disabled
          ? "bg-gray-300"
          : isDarkMode
          ? "bg-blue-600"
          : "bg-blue-500"
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          className={`text-center text-white font-bold ${
            disabled ? "text-gray-500" : ""
          }`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = {
  button: "items-center bg-indigo-500 rounded-[28px] shadow-md p-4",
  buttonText: "text-white text-lg font-semibold text-center",
};
