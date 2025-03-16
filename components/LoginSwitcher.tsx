import { Pressable, Text } from "react-native";
import { useThemeStore } from "~/store/themeStore";

interface LoginSwitcherProps {
  title: string;
  onPress: () => void;
  isSelect: boolean;
}

export default function LoginSwitcher({ title, onPress, isSelect }: LoginSwitcherProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <Pressable 
      className={`${
        isSelect 
          ? `border-b-4 ${isDarkMode ? 'border-white' : 'border-black'}` 
          : ''
      } w-40 items-center pb-2`} 
      onPress={onPress}
    >
      <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {title}
      </Text>
    </Pressable>
  );
}