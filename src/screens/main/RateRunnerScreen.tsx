import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { supabase } from "@/src/lib/supabase";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { StarRating } from "@/src/components/ui/StarRating";

export const RateRunnerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { runnerId, orderId } = route.params as {
    runnerId: string;
    orderId: string;
  };

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitRating = async () => {
    if (!runnerId || !orderId) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.from("ratings").insert({
        order_id: orderId,
        to_id: runnerId,
        from_id: profile?.id,
        rating,
        review,
      });

      if (error) throw error;

      navigation.goBack();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Rate Your Runner</Text>

      <View className="items-center mb-6">
        <StarRating rating={rating} onRatingChange={setRating} size={40} />
      </View>

      <Input
        label="Review (Optional)"
        value={review}
        onChangeText={setReview}
        placeholder="Write your review here..."
        multiline
        numberOfLines={4}
      />

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <Button
        title="Submit Rating"
        onPress={handleSubmitRating}
        loading={loading}
      />
    </View>
  );
};
