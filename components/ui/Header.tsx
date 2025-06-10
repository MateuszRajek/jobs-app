import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  userName: string;
};

export default function Header({ userName }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>swipejobs</Text>
      <Text style={styles.headerName}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1a1a1a",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
