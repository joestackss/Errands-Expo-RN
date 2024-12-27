import React from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/src/hooks/useProfile";
import { supabase } from "@/src/lib/supabase";
import { Button } from "@/src/components/ui/Button";
import { OrderCard } from "@/src/components/orders/OrderCard";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@/src/contexts/AuthContext";

export const HomeScreen = () => {
  const { profile } = useProfile();
  const { user } = useAuthContext();
  const navigation = useNavigation();

  console.log("profile", profile);
  console.log("user", user);

  const {
    data: activeOrders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activeOrders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .or(`requester_id.eq.${profile?.id},runner_id.eq.${profile?.id}`)
        .in("status", ["pending", "accepted", "in_progress"])
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <View className="p-4">
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-2xl font-bold mb-2">
            Welcome back, {profile?.full_name}
          </Text>
          <Text className="text-gray-600">
            What would you like to do today?
          </Text>
        </View>

        <View className="flex-row justify-between mb-6">
          <Button
            title="Request Food"
            onPress={() => navigation.navigate("CreateOrder", { type: "food" })}
            className="flex-1 mr-2"
          />
          <Button
            title="Request Errand"
            onPress={() =>
              navigation.navigate("CreateOrder", { type: "errand" })
            }
            className="flex-1 ml-2"
          />
        </View>

        <Text className="text-xl font-semibold mb-4">Active Orders</Text>

        {activeOrders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </ScrollView>
  );
};
