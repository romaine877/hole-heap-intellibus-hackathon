import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { Button } from "~/components/Button";
import TextField from "~/components/TextField";
import { IUploadedImage, pickImage } from "~/helpers/imagePicker";
import { useThemeStore } from "~/store/themeStore";

export default function ReportScreen() {
  const [dangerRating, setDangerRating] = useState(3);
  const [photo, setPhoto] = useState<IUploadedImage | undefined | null>(
    undefined,
  );
  const { isDarkMode } = useThemeStore();

  const handleSubmit = async () => {};

  const handlePictureUpload = async () => {
    const image = await pickImage();
    setPhoto(image);
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <View className="w-full items-center">
          <View className="w-full flex-row items-center px-4 py-2 ">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
            <Text
              className={`ml-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Pothole Details
            </Text>
          </View>
        </View>

        <View className="mx-6 my-4 items-center p-2 bg-yellow-400 rounded-xl shadow-lg elevation-lg overflow-hidden">
          <Text className="mt-4 text-2xl text-center font-bold pb-4">
            Report a new Pothole
          </Text>
          <View className="w-full">
            <TextField
              title="Description"
              value=""
              onChangeText={() => {}}
              darkMode={isDarkMode}
            />
          </View>
          <Text>Rate the danger level</Text>

          <View className="bg-yellow-300 w-12  h-12 m-2 items-center, justify-center">
            <Text className="text-center text-2xl">{dangerRating}</Text>
          </View>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={5}
            upperLimit={5}
            lowerLimit={0}
            step={1}
            value={dangerRating}
            onValueChange={(value) => {
              setDangerRating(value);
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "#333",
              borderStyle: "dashed",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
            onPress={() => {
              // Handle image upload here
              handlePictureUpload();
            }}
          >
            <Ionicons
              name="camera-outline"
              size={24}
              color="#333"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
              {photo ? photo.name : "Upload Photo"}
            </Text>
          </TouchableOpacity>

          <Button
            onPress={handleSubmit}
            className="rounded-xl bg-black w-40 m-4"
            title="Submitt"
          />
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Text className="text-xl p-4">Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
