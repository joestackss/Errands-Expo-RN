import React, { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/src/types/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

export const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const { user, error: signUpError } = await signUp(email, password);

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (user) {
      navigation.navigate("VerifyEmail", { email });
    }

    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="p-4">
        <Text className="text-3xl font-bold mb-8">Create Account</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          error={error}
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
        />

        <Button
          title="Already have an account? Sign In"
          onPress={() => navigation.navigate("Login")}
          variant="secondary"
        />
      </SafeAreaView>
    </ScrollView>
  );
};
