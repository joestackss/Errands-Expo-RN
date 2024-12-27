import React from "react";
import { View, Text, Pressable } from "react-native";
import { format } from "date-fns";

type OrderCardProps = {
  order: {
    id: string;
    service_type: "food" | "errand";
    status: string;
    total_amount: number;
    created_at: string;
    pickup_location: string;
    delivery_location: string;
  };
  onPress?: () => void;
};

export const OrderCard = ({ order, onPress }: OrderCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-lg p-4 mb-4 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold capitalize">
          {order.service_type} Order
        </Text>
        <View
          className={`
          px-2 py-1 rounded-full
          ${getStatusColor(order.status)}
        `}
        >
          <Text className="text-sm font-medium text-white capitalize">
            {order.status}
          </Text>
        </View>
      </View>

      <Text className="text-gray-600 mb-2">
        ${order.total_amount.toFixed(2)}
      </Text>

      <Text className="text-gray-500 text-sm mb-1">
        Pickup: {order.pickup_location}
      </Text>

      <Text className="text-gray-500 text-sm mb-2">
        Delivery: {order.delivery_location}
      </Text>

      <Text className="text-gray-400 text-sm">
        Created {format(new Date(order.created_at), "MMM d, h:mm a")}
      </Text>
    </Pressable>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "accepted":
      return "bg-blue-500";
    case "in_progress":
      return "bg-purple-500";
    case "completed":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
