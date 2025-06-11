import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobsListScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Jobs list Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
