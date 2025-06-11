import { Job } from "@/types/jobs";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type JobCardProps = {
  item: Job;
  onPress: (jobId: string) => void;
};

export default function JobCard({ item, onPress }: JobCardProps) {
  const handleOnPress = (id: string) => {
    onPress(id);
  };

  return (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => handleOnPress(item.jobId)}
    >
      <Image source={{ uri: item.jobTitle.imageUrl }} style={styles.image} />
      <View style={styles.jobInfo}>
        <Text style={styles.jobTitle}>{item.jobTitle.name}</Text>
        <Text style={styles.companyName}>{item.company.name}</Text>
        <Text>Branch: {item.branch}</Text>
        <Text>Distance: {item.milesToTravel.toFixed(1)} miles</Text>
        <Text>Wage: ${(item.wagePerHourInCents / 100).toFixed(2)} / hr</Text>
        {item.requirements && item.requirements.length > 0 && (
          <Text>Requirements: {item.requirements.join(", ")}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  jobCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
    justifyContent: "center",
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  companyName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
