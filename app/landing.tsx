import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "~/utils/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from "../assets/app-logo.svg";
import LoginSwitcher from "~/components/LoginSwitcher";
import TextField from "~/components/TextField";
import { Button } from "~/components/Button";
import LoginView from "~/components/views/LoginView";
import SignupView from "~/components/views/SignupView";
import { Redirect } from "expo-router";
import { useAuthStore } from "~/store/authStore";
import Toast from "react-native-toast-message";

export default function Landing() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handlePress = () => {
    toggleLogin();
  };

  const {token} = useAuthStore()



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className=" flex-1 space-x-32"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        
      >
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

          {isLogin ? <LoginView loading={loading} /> : <SignupView loading={loading} />}

        

          {error ? <Text className="text-red-500">{error}</Text> : null}
        </SafeAreaView>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
