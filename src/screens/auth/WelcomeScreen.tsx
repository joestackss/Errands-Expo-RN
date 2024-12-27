import React from "react";
import { View, Text, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/src/types/navigation";
import { Button } from "@/src/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

export const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-1 justify-between p-4 bg-white">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-40 h-40 mb-8"
        />
        <Text className="text-3xl font-bold mb-2 text-center">
          Welcome to Errands
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          Your campus delivery and errand service
        </Text>
      </View>

      <View className="gap-4">
        <Button
          title="Sign In"
          onPress={() => navigation.navigate("Login")}
          variant="primary"
        />
        <Button
          title="Create Account"
          onPress={() => navigation.navigate("Register")}
          variant="secondary"
        />
      </View>
    </View>
  );
};
