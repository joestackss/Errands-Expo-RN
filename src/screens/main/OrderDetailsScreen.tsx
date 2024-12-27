import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/src/hooks/useProfile";
import { useRealtime } from "@/src/hooks/useRealtime";
import { supabase } from "@/src/lib/supabase";
import { LoadingScreen } from "../LoadingScreen";
import { Button } from "@/src/components/ui/Button";

export const OrderDetailsScreen = () => {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };
  const { profile } = useProfile();
  const navigation = useNavigation();

  useRealtime("orders", profile?.id ?? "");

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          requester:profiles!requester_id(*),
          runner:profiles!runner_id(*)
        `
        )
        .eq("id", orderId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleAcceptOrder = async () => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          runner_id: profile.id,
          status: "accepted",
        })
        .eq("id", orderId);

      if (error) throw error;
    } catch (e) {
      console.error("Error accepting order:", e);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) throw error;
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Order Details</Text>

        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold mb-2">
            Status: {order?.status}
          </Text>
          <Text className="text-gray-600 mb-1">
            Pickup: {order?.pickup_location}
          </Text>
          <Text className="text-gray-600 mb-2">
            Delivery: {order?.delivery_location}
          </Text>
          <Text className="text-gray-600">
            Total: ${order?.total_amount.toFixed(2)}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="font-semibold mb-2">Instructions:</Text>
          <Text className="text-gray-600">{order?.instructions}</Text>
        </View>

        {order?.requester && (
          <View className="mb-4">
            <Text className="font-semibold mb-2">Requester:</Text>
            <Text>{order.requester.full_name}</Text>
          </View>
        )}

        {order?.runner && (
          <View className="mb-4">
            <Text className="font-semibold mb-2">Runner:</Text>
            <Text>{order.runner.full_name}</Text>
          </View>
        )}

        {/* Show different buttons based on user role and order status */}
        {profile?.id === order?.requester_id ? (
          // Requester actions
          order?.status === "completed" && (
            <Button
              title="Rate Runner"
              onPress={() =>
                navigation.navigate("RateRunner", {
                  runnerId: order.runner_id,
                  orderId: order.id,
                })
              }
            />
          )
        ) : (
          // Runner actions
          <>
            {order?.status === "pending" && (
              <Button title="Accept Order" onPress={handleAcceptOrder} />
            )}
            {order?.status === "accepted" && (
              <Button
                title="Start Delivery"
                onPress={() => handleUpdateStatus("in_progress")}
              />
            )}
            {order?.status === "in_progress" && (
              <Button
                title="Complete Delivery"
                onPress={() => handleUpdateStatus("completed")}
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};
