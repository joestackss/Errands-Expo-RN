import React, { useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";

import { useQuery } from "@tanstack/react-query";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { OrderCard } from "@/src/components/orders/OrderCard";
import { useProfile } from "@/src/hooks/useProfile";

const Tab = createMaterialTopTabNavigator();

const OrdersList = ({
  status,
  userId,
  role,
}: {
  status: string[];
  userId: string;
  role: "requester" | "runner";
}) => {
  const navigation = useNavigation();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", status, role],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          requester:profiles!requester_id(full_name),
          runner:profiles!runner_id(full_name)
        `
        )
        .eq(role === "requester" ? "requester_id" : "runner_id", userId)
        .in("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderCard
          order={item}
          onPress={() =>
            navigation.navigate("OrderDetails", { orderId: item.id })
          }
        />
      )}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center py-8">
          <Text className="text-gray-500">No orders found</Text>
        </View>
      }
    />
  );
};

export const OrdersScreen = () => {
  const { profile } = useProfile();

  if (!profile) return null;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Active"
        children={() => (
          <OrdersList
            status={["pending", "accepted", "in_progress"]}
            userId={profile.id}
            role={profile.role}
          />
        )}
      />
      <Tab.Screen
        name="Completed"
        children={() => (
          <OrdersList
            status={["completed"]}
            userId={profile.id}
            role={profile.role}
          />
        )}
      />
      <Tab.Screen
        name="Cancelled"
        children={() => (
          <OrdersList
            status={["cancelled"]}
            userId={profile.id}
            role={profile.role}
          />
        )}
      />
    </Tab.Navigator>
  );
};
