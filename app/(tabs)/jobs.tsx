import Header from "@/components/ui/Header";
import JobCard from "@/components/ui/JobCard";
import { useJobs } from "@/hooks/useJobs";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobsListScreen() {
  const { jobs, loading, error } = useJobs(
    "7f90df6e-b832-44e2-b624-3143d428001f"
  );

  const router = useRouter();

  const handleJobPress = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00cc88" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ padding: 20 }}>
        {jobs.map((job) => (
          <JobCard key={job.jobId} item={job} onPress={handleJobPress} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  error: {
    marginTop: 20,
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
  },
});
