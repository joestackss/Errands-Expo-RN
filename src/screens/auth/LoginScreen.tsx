import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useAuth } from "@/src/hooks/useAuth";
import { useState } from "react";
import { View, Text } from "react-native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">Welcome Back</Text>

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
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button title="Sign In" onPress={handleLogin} loading={loading} />
    </View>
  );
};
