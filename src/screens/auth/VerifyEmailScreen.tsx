import React from "react";
import { View, Text } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/src/types/navigation";
import { Button } from "@/src/components/ui/Button";

type VerifyEmailRouteProp = RouteProp<AuthStackParamList, "VerifyEmail">;
type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "VerifyEmail"
>;

export const VerifyEmailScreen = () => {
  const route = useRoute<VerifyEmailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { email } = route.params;

  return (
    <View className="flex-1 justify-center p-4 bg-white">
      <Text className="text-3xl font-bold mb-4">Verify your email</Text>
      <Text className="text-gray-600 mb-8">
        We've sent a verification link to {email}. Please check your inbox and
        verify your email to continue.
      </Text>

      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};
