import React, { useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import AppLogo from "../assets/app-logo.svg";

import LoginSwitcher from "~/components/LoginSwitcher";
import LoginView from "~/components/views/LoginView";
import SignupView from "~/components/views/SignupView";
import { useAuthStore } from "~/store/authStore";
import { useThemeStore } from "~/store/themeStore";
import { router } from "expo-router";

export default function Landing() {
  const { token, loading } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handlePress = () => {
    toggleLogin();
  };

  // useEffect(() => {
  //   if (token) {
  //     router.replace("/");
  //   }
  // }, [token]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView className="flex-1 px-4">
          <View className="items-center">
            <AppLogo className="w-32 h-32" />
          </View>

          <View className="flex-row justify-evenly space-x-4 width-full py-6">
            <LoginSwitcher
              title="Login"
              onPress={handlePress}
              isSelect={isLogin}
            />
            <LoginSwitcher
              title="Sign Up"
              onPress={handlePress}
              isSelect={!isLogin}
            />
          </View>

          {isLogin ? (
            <LoginView loading={loading} />
          ) : (
            <SignupView loading={loading} />
          )}

          {error ? <Text className="text-red-500">{error}</Text> : null}
        </SafeAreaView>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
