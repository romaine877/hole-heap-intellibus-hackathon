import React, { useState } from "react";
import { View, Text } from "react-native";

import { Button } from "../Button";
import TextField from "../TextField";

import { useAuthStore } from "~/store/authStore";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

interface SignupViewProps {
  loading: boolean;
}

export default function SignupView({ loading }: SignupViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp } = useAuthStore();



  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
      });
      return;
    }

    const success = await signUp(email, password);
    if (success) {
      router.push("/");
    }
  };

  return (
    <View className="flex-1">
      <TextField
        title="First Name"
        value={firstName}
        onChangeText={setFirstName}
        darkMode={false}
      />
      <TextField
        title="Last Name"
        value={lastName}
        onChangeText={setLastName}
        darkMode={false}
      />
      <TextField
        title="Email"
        value={email}
        onChangeText={setEmail}
        darkMode={false}
      />
      <TextField
        title="Password"
        value={password}
        onChangeText={setPassword}
        darkMode={false}
      />
      <TextField
        title="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        darkMode={false}
      />

      <Button
        className="bg-black rounded-md"
        title="Sign Up"
        onPress={handleSignUp}
        disabled={loading}
      />
    </View>
  );
}
