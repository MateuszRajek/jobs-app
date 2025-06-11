import Banner from "@/components/ui/Banner";
import BannerContent from "@/components/ui/BannerContent";
import Card from "@/components/ui/Card";
import Header from "@/components/ui/Header";
import JobDetailsHeader from "@/components/ui/JobDetailsHeader";
import Section from "@/components/ui/Section";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { formatCentsToDollars, formatShiftDateRange } from "../utils/format";
const LocationIcon = require("@/assets/images/location.png");
const CalendarIcon = require("@/assets/images/calendar.png");
const ToolsIcon = require("@/assets/images/tools.png");
const PersonIcon = require("@/assets/images/user.png");

export default function JobsDetails() {
  const { id } = useLocalSearchParams();
  const jobOffer = useSelector((state: RootState) =>
    state.jobs.jobs.find((job) => job.jobId === id)
  );

  const navigaton = useNavigation();

  useLayoutEffect(() => {
    navigaton.setOptions({
      headerTitle: "Job Details",
      headerBackTitle: "Back",
    });
  }, [navigaton, id, jobOffer]);

  if (!jobOffer) {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    );
  }

  const bannerContent = [
    {
      key: "jobDistance",
      label: "Distance",
      content: `${jobOffer.milesToTravel.toFixed(1)} miles`,
    },
    {
      key: "rate",
      label: "Hourly Rate",
      content: `$${formatCentsToDollars(jobOffer.wagePerHourInCents)}`,
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: { startDate: string; endDate: string };
  }) => (
    <Text style={styles.preferenceItem}>
      {formatShiftDateRange(item.startDate, item.endDate)}
    </Text>
  );

  const keyExtractor = (_: any, index: number) => index.toString();

  const sections = [
    {
      key: "shiftDates",
      icon: CalendarIcon,
      title: "Shift Dates",
      content: () => (
        <FlatList
          data={jobOffer.shifts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={{ marginBottom: 10 }}
          scrollEnabled={false}
        />
      ),
    },
    {
      key: "location",
      icon: LocationIcon,
      title: "Location",
      content: () => (
        <View>
          <Text style={styles.preferenceItem}>
            {jobOffer.company.address.formattedAddress}
          </Text>
          <Text style={styles.preferenceItem}>
            {jobOffer.milesToTravel.toFixed(2)} miles from your job search
            location
          </Text>
        </View>
      ),
    },
    {
      key: "requirements",
      icon: ToolsIcon,
      title: "Requirements",
      content: () => (
        <View>
          {jobOffer?.requirements?.map((item) => (
            <Text key={item} style={styles.preferenceItem}>
              - {item}
            </Text>
          ))}
        </View>
      ),
    },
    {
      key: "reportTo",
      icon: PersonIcon,
      title: "Report To",
      content: () => (
        <Text style={styles.preferenceItem}>
          {jobOffer.company.reportTo.name} {jobOffer.branchPhoneNumber}
        </Text>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Card>
          <JobDetailsHeader {...jobOffer} />
          <Banner style={styles.banner}>
            {bannerContent.map(({ key, label, content }) => (
              <BannerContent key={key} label={label} content={content} />
            ))}
          </Banner>
          <View style={{ paddingHorizontal: 12 }}>
            {sections.map((section) => (
              <Section
                key={section.key}
                icon={
                  <Image source={section.icon} style={styles.sectionIcon} />
                }
                title={section.title}
              >
                {section.content()}
              </Section>
            ))}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionIcon: {
    width: 20,
    height: 20,
  },
  preferenceItem: {
    marginBottom: 4,
    color: "#000000",
    fontSize: 15,
  },
});
