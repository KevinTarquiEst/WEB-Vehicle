import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type FormInputProps = TextInputProps & {
  label: string;
  required?: boolean;
  smsError?: string;
  typeInput?: "string" | "integer";
};

export const FormInput = ({
  label,
  required,
  smsError,
  typeInput = "string",
  style,
  onChangeText,
  ...props
}: FormInputProps) => {
  // interceptamos el texto antes de enviarlo al padre
  const handleChange = (value: string) => {
    let finalValue = value;
    if (typeInput === "integer") finalValue = value.replaceAll(/\D/g, "");
    if (onChangeText) onChangeText(finalValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && " *"}
      </Text>

      <TextInput
        {...props}
        style={[styles.input, style]}
        placeholderTextColor="#9ca3af"
        onChangeText={handleChange}
      />

      {smsError ? <Text style={styles.error}>{smsError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginTop: 4,
    fontSize: 13,
  },
});
