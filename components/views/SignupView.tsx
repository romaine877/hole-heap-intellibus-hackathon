import { View, Text } from "react-native";
import React, { useState } from "react";
import TextField from "../TextField";
import { Button } from "../Button";
import { useAuthStore } from "~/store/authStore";

interface SignupViewProps {
  loading: boolean;
}

export default function SignupView({ loading }: SignupViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp } = useAuthStore();

  const handleSignUp = () => {
    signUp(email, password);
  };

  return (
    <View className="flex-1">
      <TextField
        title="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextField
        title="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextField title="Email" value={email} onChangeText={setEmail} />
      <TextField title="Password" value={password} onChangeText={setPassword} />
      <TextField
        title="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
