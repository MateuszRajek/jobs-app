import { Profile } from "@/types/profile";
import { StyleSheet, Text, View } from "react-native";

export default function Avatar({ ...profile }: Profile) {
  return (
    <View style={styles.userSection}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </Text>
        </View>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.workerId}>ID: {profile.workerId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userSection: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  userName: {
    marginBottom: 4,
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },
  workerId: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00cc88",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
});
