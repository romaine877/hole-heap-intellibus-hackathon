import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Image as RNImage,
  View,
  Text,
  ImageSourcePropType,
  Pressable,
  Platform,
} from "react-native";
import { Link } from "expo-router";

import { useThemeStore } from "~/store/themeStore";
interface PotholeListProps {
  image: ImageSourcePropType;
  text: string;
  id: string;
}

export default function PotHoleList({ image, text, id }: PotholeListProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <Link asChild href={`/pothole/${id}`}>
      <Pressable>
        <View className={`m-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
          <View className="w-full flex justify-between items-center flex-row p-6 rounded">
            {Platform.OS !== "web" ? (
              <RNImage source={image} className="w-24 h-24 rounded-lg" />
            ) : (
              <Image
                source={image}
                contentFit="contain"
                className="w-24 h-24 rounded-lg"
              />
            )}

            <Text
              className={`text-2xl w-48 text-center ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {text}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={32}
              color={isDarkMode ? "white" : "black"}
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
