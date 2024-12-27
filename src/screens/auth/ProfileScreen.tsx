import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/src/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";

// Types
interface UserMetadata {
  avatar_url?: string;
  full_name?: string;
}

interface User {
  email: string | undefined;
  user_metadata?: UserMetadata;
}

interface ProfileScreenProps {
  navigation?: any; // Add specific navigation type based on your setup
}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            const { error } = await signOut();
            if (error) throw error;
          } catch (error) {
            Alert.alert("Error", "Failed to sign out. Please try again.");
            console.error("Error signing out:", error);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-base text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-5">
      {/* Profile Header */}
      <View className="items-center mb-8">
        <View className="mb-4">
          {user.user_metadata?.avatar_url ? (
            <Image
              source={{ uri: user.user_metadata.avatar_url }}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-100 justify-center items-center">
              <MaterialIcons name="person" size={40} color="#666" />
            </View>
          )}
        </View>

        <View className="items-center">
          <Text className="text-2xl font-bold mb-1">
            {user.user_metadata?.full_name || "User"}
          </Text>
          <Text className="text-gray-600 text-base">{user.email}</Text>
        </View>
      </View>

      {/* Profile Actions */}
      <View className="mt-auto">
        <TouchableOpacity
          onPress={handleSignOut}
          disabled={loading}
          className={`
            flex-row items-center justify-center 
            bg-red-600 p-4 rounded-lg
            ${loading ? "opacity-50" : "active:opacity-80"}
          `}
        >
          <MaterialIcons name="logout" size={24} color="white" />
          <Text className="text-white font-semibold text-base ml-2">
            {loading ? "Signing Out..." : "Sign Out"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
