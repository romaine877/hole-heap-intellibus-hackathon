import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router, Stack } from "expo-router";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import AppLogo from "~/assets/app-logo.svg";
import { Button } from "~/components/Button";
import { usePotHoleStore } from "~/store/potholeStore";
import { useThemeStore } from "~/store/themeStore";
import { db } from "~/utils/firebase";

export default function NewDrive() {
  const { isDarkMode } = useThemeStore();
  const { sendLocation } = usePotHoleStore();
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEndDrive = () => {
    router.push("/");
  };
  const [potholes, setPotholes] = useState<boolean>(false);

  useEffect(() => {
    // Request location permissions
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to listen for updates",
        });
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Function to get and send location
      const updateLocation = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const newLocation = {
            lat: location.coords.latitude,
            long: location.coords.longitude,
          };
          setLocation(newLocation);
          sendLocation(newLocation);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to listen for updates",
          });
          console.error("Error getting location:", error);
          setErrorMsg("Error getting location");
        }
      };

      // Initial location update
      updateLocation();

      // Set up interval for location updates
      const intervalId = setInterval(updateLocation, 5000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    })();
  }, []);

  useEffect(() => {
    const potholesRef = collection(db, "pothole_feed");

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      potholesRef,
      (snapshot) => {
        // This will give you all documents on initial load and subsequent changes
        const potholes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Current potholes:", potholes);

        // Handle individual changes for notifications
        snapshot.docChanges().forEach((change) => {
          const pothole = change.doc.data();
          console.log("Changed pothole:", pothole); // Log the changed document

          if (change.type === "added") {
            Toast.show({
              type: "info",
              text1: "New Pothole Added",
              text2: `${pothole.location || "Location unknown"}`,
            });
          }
          if (change.type === "modified") {
            Toast.show({
              type: "success",
              text1: "Pothole Updated",
              text2: `${pothole.location || "Location unknown"}`,
            });
          }
          if (change.type === "removed") {
            Toast.show({
              type: "error",
              text1: "Pothole Removed",
              text2: `${pothole.location || "Location unknown"}`,
            });
          }
        });
      },
      (error) => {
        console.error("Error listening to potholes:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to listen for updates",
        });
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView
        edges={["top"]}
        className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
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
        <View className="w-full items-center">
          <AppLogo className="w-32 h-32" />
        </View>
        <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <View className="rounded-full m-12 p-4 shadow-lg elevation-lg bg-yellow-400 items-center justify-center overflow-hidden">
            <Text className="text-2xl font-bold">Drive Safely</Text>
          </View>
          <View className="flex-1 items-center justify-center p-8 m-12">
            <Text
              className={`text-2xl font-bold  text-center ${isDarkMode ? "text-white" : "text-black"}`}
            >
              No new Pothole alerts for this drive
            </Text>
          </View>

          <Button
            title="Report a Pothole"
            className="mt-auto bg-gray-950 mx-8 rounded-xl mb-8"
            onPress={() => {
              router.push("/pothole/new");
            }}
          />
          <Button
            title="End Drive"
            className="mt-auto bg-gray-950 mx-8 rounded-xl mb-8"
            onPress={() => {
              handleEndDrive();
            }}
          />
        </View>
      </SafeAreaView>
      <Toast />
      {errorMsg && (
        <Text
          className={`text-red-500 ${isDarkMode ? "text-red-400" : "text-red-600"}`}
        >
          {errorMsg}
        </Text>
      )}
    </>
  );
}
