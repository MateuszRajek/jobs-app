import { jobAcceptType } from "@/types/jobs";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  label: string;
  onPress: (type: jobAcceptType) => void;
  type: jobAcceptType;
};

export default function Button({ label, onPress, type }: ButtonProps) {
  const handlePress = (type: jobAcceptType) => {
    onPress(type);
  };
  return (
    <TouchableOpacity
      style={getButtonStyle(type)}
      onPress={() => handlePress(type)}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const getButtonStyle = (type: jobAcceptType) => ({
  ...styles.button,
  backgroundColor: type === "reject" ? "transparent" : "#000000",
});

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#c0c0c0",
  },
  label: {
    color: "#c0c0c0",
    fontSize: 18,
    fontWeight: "bold",
  },
});
