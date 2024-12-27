import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useProfile } from "@/src/hooks/useProfile";
import { supabase } from "@/src/lib/supabase";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";

export const CreateOrderScreen = () => {
  const { profile } = useProfile();
  const navigation = useNavigation();
  const route = useRoute();
  const { type } = route.params as { type: "food" | "errand" };

  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    instructions: "",
    items: "",
    estimatedPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateOrder = async () => {
    if (!profile) return;

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("orders")
        .insert({
          requester_id: profile.id,
          service_type: type,
          pickup_location: formData.pickupLocation,
          delivery_location: formData.deliveryLocation,
          instructions: formData.instructions,
          items: JSON.stringify([{ name: formData.items }]),
          total_amount: parseFloat(formData.estimatedPrice),
          service_fee: parseFloat(formData.estimatedPrice) * 0.1,
          runner_fee: parseFloat(formData.estimatedPrice) * 0.15,
          status: "pending",
        })
        .single();

      if (error) throw error;

      navigation.navigate("OrderDetails", { orderId: data.id });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">
          Create {type === "food" ? "Food" : "Errand"} Request
        </Text>

        <Input
          label="Pickup Location"
          value={formData.pickupLocation}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, pickupLocation: text }))
          }
          placeholder="Enter pickup location"
        />

        <Input
          label="Delivery Location"
          value={formData.deliveryLocation}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, deliveryLocation: text }))
          }
          placeholder="Enter delivery location"
        />

        <Input
          label={type === "food" ? "Food Items" : "Errand Details"}
          value={formData.items}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, items: text }))
          }
          placeholder={
            type === "food"
              ? "Enter food items and quantities"
              : "Describe what you need"
          }
          multiline
        />

        <Input
          label="Additional Instructions"
          value={formData.instructions}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, instructions: text }))
          }
          placeholder="Any special instructions?"
          multiline
        />

        <Input
          label="Estimated Price"
          value={formData.estimatedPrice}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, estimatedPrice: text }))
          }
          placeholder="Enter estimated price"
          keyboardType="numeric"
        />

        {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

        <Button
          title="Create Request"
          onPress={handleCreateOrder}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};
