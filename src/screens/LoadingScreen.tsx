import React from "react";
import { View, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
