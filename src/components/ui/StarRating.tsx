import React from "react";
import { View, Pressable } from "react-native";
import { Star } from "lucide-react-native";

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
};

export const StarRating = ({
  rating,
  onRatingChange,
  size = 24,
}: StarRatingProps) => {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((value) => (
        <Pressable
          key={value}
          onPress={() => onRatingChange(value)}
          className="mx-1"
        >
          <Star
            size={size}
            color={value <= rating ? "#FFD700" : "#E5E7EB"}
            fill={value <= rating ? "#FFD700" : "transparent"}
          />
        </Pressable>
      ))}
    </View>
  );
};
