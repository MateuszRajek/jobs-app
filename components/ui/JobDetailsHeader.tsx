import { Job } from "@/types/jobs";
import { Image, StyleSheet, Text, View } from "react-native";

export default function JobDetailsHeader({ ...job }: Job) {
  const { jobTitle, company } = job;

  return (
    <View>
      <Image source={{ uri: jobTitle.imageUrl }} style={styles.jobImage} />
      <View style={{ paddingHorizontal: 12 }}>
        <Text style={styles.jobTitle}>{jobTitle.name}</Text>
        <Text style={styles.companyName}>{company.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  jobImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 16,
  },
  jobTitle: {
    marginBottom: 4,
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },
  companyName: {
    marginBottom: 4,
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
