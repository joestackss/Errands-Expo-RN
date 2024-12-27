import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  onPress: () => void;
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export const Button = ({
  onPress,
  title,
  loading = false,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        p-4 rounded-lg w-full
        ${variant === "primary" ? "bg-blue-600" : "bg-gray-600"}
        ${disabled ? "opacity-50" : "opacity-100"}
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-center font-semibold">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
