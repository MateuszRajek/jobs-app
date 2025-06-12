import { StyleSheet, Text, View } from "react-native";

type BannerContentProps = {
  label: string;
  content: string;
};

export default function BannerContent({ label, content }: BannerContentProps) {
  return (
    <View style={styles.bannerContent}>
      <Text style={styles.bannerLabel}>{label}</Text>
      <Text style={styles.bannerValue}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContent: {
    alignItems: "center",
  },
  bannerLabel: {
    marginBottom: 2,
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },
  bannerValue: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
