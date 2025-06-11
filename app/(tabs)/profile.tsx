import Avatar from "@/components/ui/Avatar";
import Banner from "@/components/ui/Banner";
import BannerContent from "@/components/ui/BannerContent";
import Header from "@/components/ui/Header";
import Section from "@/components/ui/Section";
import { useProfile } from "@/hooks/useProfile";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const LocationIcon = require("@/assets/images/location.png");
const MailIcon = require("@/assets/images/mail.png");
const PhoneIcon = require("@/assets/images/phone.png");
const PreferencesIcon = require("@/assets/images/question.png");

export default function ProfileScreen() {
  const { profile, loading, error } = useProfile(
    "7f90df6e-b832-44e2-b624-3143d428001f"
  );

  const userName = `${profile.firstName} ${profile.lastName}`;

  const sections = [
    {
      key: "email",
      icon: MailIcon,
      title: "Email",
      content: () => <Text style={styles.preferenceItem}>{profile.email}</Text>,
    },
    {
      key: "phone",
      icon: PhoneIcon,
      title: "Phone Number",
      content: () => (
        <Text style={styles.preferenceItem}>{profile.phoneNumber}</Text>
      ),
    },
    {
      key: "address",
      icon: LocationIcon,
      title: "Address",
      content: () => (
        <View style={styles.addressContent}>
          <Text style={styles.preferenceItem}>
            {profile.address.formattedAddress}
          </Text>
          <Text style={styles.preferenceItem}>
            Zone: {profile.address.zoneId}
          </Text>
        </View>
      ),
    },
    {
      key: "preferences",
      icon: PreferencesIcon,
      title: "Job Preferences",
      content: () => (
        <>
          <Text style={styles.preferenceItem}>
            - Maximum distance: {profile.maxJobDistance} miles
          </Text>
          <Text style={styles.preferenceItem}>
            - Available for jobs within zone {profile.address.zoneId}
          </Text>
        </>
      ),
    },
  ];

  const bannerContent = [
    {
      key: "jobDistance",
      label: "Max Job Distance",
      content: `${profile.maxJobDistance} miles`,
    },
  ];

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
      <Header userName={userName} />
      <View style={styles.card}>
        <Avatar {...profile} />
        <Banner>
          {bannerContent.map(({ key, label, content }) => (
            <BannerContent key={key} label={label} content={content} />
          ))}
        </Banner>
        <View style={{ paddingHorizontal: 12 }}>
          {sections.map(({ key, icon, title, content }) => (
            <Section
              key={key}
              icon={<Image source={icon} style={styles.sectionIcon} />}
              title={title}
            >
              {content()}
            </Section>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    margin: 15,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionContent: {
    color: "#000000",
    fontSize: 15,
  },
  sectionIcon: {
    width: 20,
    height: 20,
  },
  addressContent: {
    marginTop: 2,
  },
  preferenceItem: {
    marginBottom: 4,
    color: "#000000",
    fontSize: 15,
  },
  error: {
    marginTop: 20,
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
  },
});
