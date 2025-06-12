import { RootState } from "@/app/store";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Header() {
  const { profile } = useSelector((state: RootState) => state?.profile);

  const userName = `${profile.firstName} ${profile.lastName}`;

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
