import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  BackArrow,
  blackArrow,
  Timer,
  line,
  lineTwo,
} from "@/components/Icons/Icons";
import { SvgXml } from "react-native-svg";
import { router, useGlobalSearchParams } from "expo-router";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { supabase } from "@/lib/supabase";

interface Doctors {
  hospital_name: string;
  specialization: string;
  first_name: string;
  last_name: string;
  created_at: string;
  image: string;
  id: string;
}

type FetchDoctor = Doctors | null;
type FetchError = string | null;

const tableName = "doctors";

const SessionEnded = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [FetchDoctor, setFetchDoctor] = useState<FetchDoctor>(null);
  const [FetchError, setFetchError] = useState<FetchError>(null);
  const { id } = useGlobalSearchParams();

  useEffect(() => {
    const FetchDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .eq("id", `${id}`)
          .single();

        if (data) {
          setFetchDoctor(data);
          setFetchError(null);
        }

        if (error) {
          setFetchDoctor(null);
          setFetchError("could not fetch description articles in database");
          return null;
        }
      } catch (error) {
        console.error(error);
        setFetchError("An unexpected error occurred");
        return null;
      }
    };
    FetchDoctors();
  }, []);

  return (
    <>
      {FetchError && <Text>{FetchError}</Text>}
      {FetchDoctor && (
        <View
          style={[
            styles.container,
            { backgroundColor: theme === "dark" ? "#181A20" : "white" },
          ]}
        >
          <StatusBar style={theme === "light" ? "dark" : "light"} />
          <View style={styles.backArrow}>
            <TouchableOpacity onPress={() => router.back()}>
              <SvgXml xml={theme === "dark" ? BackArrow : blackArrow} />
            </TouchableOpacity>
          </View>

          <View style={styles.middlePart}>
            <SvgXml xml={Timer} />
            <View style={styles.middleText}>
              <Text
                style={[
                  Typography.heading._5,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                The consultation session has ended.
              </Text>
              <Text
                style={[
                  Typography.regular.large,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                Recordings have been saved in activity.
              </Text>
            </View>

            <View>
              <SvgXml xml={lineTwo} />
            </View>
          </View>

          <View style={styles.detail}>
            <Image
              source={{ uri: FetchDoctor.image }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />

            <View style={styles.detail}>
              <Text
                style={[
                  Typography.heading._4,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                {FetchDoctor.first_name} {FetchDoctor.last_name}
              </Text>
              <Text
                style={[
                  Typography.medium.xLarge,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                {FetchDoctor.specialization}
              </Text>
              <Text
                style={[
                  Typography.medium.medium,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                {FetchDoctor.hospital_name}
              </Text>
            </View>
            <View>
              <SvgXml xml={line} />
            </View>
          </View>

          <View style={styles.Button}>
            <TouchableOpacity
              onPress={() => router.push("Appointments")}
              style={[
                styles.backButton,
                { backgroundColor: theme === "dark" ? "#35383F" : "#E9F0FF" },
              ]}
            >
              <Text
                style={[
                  Typography.bold.large,
                  { color: theme === "dark" ? "#FFFFFF" : "#246BFD" },
                ]}
              >
                Back to Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.LeaveButton}
              onPress={() =>
                router.push({
                  pathname:"(app)/Appointments/Review/ReviewBlankform",
                 params: {id: id}
                })
              }
            >
              <Text style={[Typography.bold.large, { color: "#FFFFFF" }]}>
                Leave a Review
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default SessionEnded;

const styles = StyleSheet.create({
  LeaveButton: {
    backgroundColor: "#246BFD",
    borderRadius: 100,
    padding: 10,
    width: 164,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#246BFD",
    elevation: 4,
  },
  backButton: {
    backgroundColor: "#E9F0FF",
    borderRadius: 100,
    padding: 10,
    width: 184,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  detail: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  middleText: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  middlePart: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  backArrow: {
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
    gap: 24,
  },
});
