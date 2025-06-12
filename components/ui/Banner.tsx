import { StyleSheet, View } from "react-native";

type BannerProps = {
  children: React.ReactNode;
  style?: object;
};

export default function Banner({ children, style }: BannerProps) {
  return <View style={[styles.banner, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  banner: {
    padding: 12,
    backgroundColor: "#00cc88",
  },
});
