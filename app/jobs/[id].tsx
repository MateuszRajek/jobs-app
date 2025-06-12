import Banner from "@/components/ui/Banner";
import BannerContent from "@/components/ui/BannerContent";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Header from "@/components/ui/Header";
import JobDetailsHeader from "@/components/ui/JobDetailsHeader";
import Modal from "@/components/ui/Modal";
import Section from "@/components/ui/Section";
import useJobAccept from "@/hooks/useJobAccept";
import { jobAcceptType } from "@/types/jobs";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
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

const buttons = [
  { type: "reject", label: "No Thanks" },
  { type: "accept", label: "I'll Take it" },
];

export default function JobsDetails() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { id } = useLocalSearchParams();
  const jobOffer = useSelector((state: RootState) =>
    state.jobs.jobs.find((job) => job.jobId === id)
  );
  const { acceptJobOffer, message, isLoading, error } = useJobAccept({
    workerId: "7f90df6e-b832-44e2-b624-3143d428001f",
    jobId: id as string,
  });

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
    <Text style={styles.sectionContent}>
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
          <Text style={styles.sectionContent}>
            {jobOffer.company.address.formattedAddress}
          </Text>
          <Text style={[styles.sectionContent, styles.sectionContentSmall]}>
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
            <Text key={item} style={styles.sectionContent}>
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
        <Text style={styles.sectionContent}>
          {jobOffer.company.reportTo.name} {jobOffer.branchPhoneNumber}
        </Text>
      ),
    },
  ];

  const handleButtonPress = async (type: jobAcceptType) => {
    toggleModalVisibility();
    await acceptJobOffer(type);
  };

  const toggleModalVisibility = () => {
    setIsModalVisible((prevState) => !prevState);
  };

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
                marginVertical: 20,
              }}
            >
              {buttons.map((button) => (
                <Button
                  key={button.label}
                  label={button.label}
                  type={button.type as jobAcceptType}
                  onPress={() => {
                    handleButtonPress(button.type as jobAcceptType);
                  }}
                />
              ))}
            </View>
          </View>
        </Card>
      </ScrollView>
      {isModalVisible && (
        <Modal onClose={toggleModalVisibility}>
          {isLoading && <ActivityIndicator size="large" color="#00cc88" />}
          {error && <Text style={styles.error}>{error}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
          {!isLoading && (
            <Button
              label="Close"
              type="accept"
              onPress={toggleModalVisibility}
            />
          )}
        </Modal>
      )}
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
  sectionContent: {
    marginBottom: 4,
    color: "#000000",
    fontSize: 15,
  },
  sectionContentSmall: {
    fontSize: 12,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 200,
    borderRadius: 10,
  },
  error: {
    marginTop: 20,
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
