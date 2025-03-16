import { Redirect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { Button } from "../Button";
import TextField from "../TextField";

import { useAuthStore } from "~/store/authStore";
import { useThemeStore } from "~/store/themeStore";

interface LoginViewProps {
  loading: boolean;
}

export default function LoginView({ loading }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const { login, token, loading: storeLoading, error } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const [currentLoading, setCurrentLoading] = useState(loading);

  const router = useRouter();

  const handleSignIn = async () => {
    if (email.length === 0) {
      setEmailError("Email field cant be empty");
      return;
    }
    if (password.length === 0) {
      setEmailError("Password field cant be empty");
      return;
    }
    try {
      const response = await login(email, password);
      if (response === true) {
        router.replace("/(tabs)");
      }
    } catch (e) {
      setEmailError(("Error logging in: " + e) as string);
    }

    if (token) {
      return <Redirect href="/(tabs)" />;
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <TextField 
        title="Email" 
        value={email} 
        onChangeText={setEmail}
        darkMode={isDarkMode} 
      />
      <TextField 
        title="Password" 
        value={password} 
        onChangeText={setPassword}
        darkMode={isDarkMode}
      />
      <Button
        className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-md`}
        title="Login"
        onPress={handleSignIn}
        disabled={storeLoading}
      />
      {emailError && (
        <Text className={`text-red-500 mt-2 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
          {emailError}
        </Text>
      )}
    </View>
  );
}
