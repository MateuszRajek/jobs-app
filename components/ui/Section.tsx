import { StyleSheet, Text, View } from "react-native";

type SectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  style?: object;
};

export default function Section({
  icon,
  title,
  children,
  style,
}: SectionProps) {
  return (
    <View style={[styles.section, style]}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
});
