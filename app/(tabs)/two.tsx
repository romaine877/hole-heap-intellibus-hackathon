import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "~/constants/images";
import AppLogo from "../../assets/app-logo.svg";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1">
        <View className="w-full items-center">
        
    
          <AppLogo className="w-32 h-32" />
        </View>

       <View className="flex-row w-full justify-between p-8" >

          <Text className="text-xl font-bold">Dark Mode</Text>
         <Switch/>
       </View>
       <View className="flex-row w-full justify-between p-8" >

          <Text className="text-xl font-bold">Dark Mode</Text>
         <Ionicons name="chevron-forward" size={24} />
       </View>
       <View className="flex-row w-full justify-between p-8" >

          <Text className="text-xl font-bold">Dark Mode</Text>
         <Switch/>
       </View>
      </SafeAreaView>
    </>
  );
}
