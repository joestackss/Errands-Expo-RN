import { TextInput, View, Text } from "react-native";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  error?: string;
};

export const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  label,
  error,
}: InputProps) => {
  return (
    <View className="w-full mb-4">
      {label && <Text className="text-gray-700 mb-2">{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className={`
          w-full p-4 rounded-lg border
          ${error ? "border-red-500" : "border-gray-300"}
          bg-white
        `}
      />
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
};
