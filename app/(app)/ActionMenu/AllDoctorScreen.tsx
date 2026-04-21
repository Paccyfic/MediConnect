import React, { ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  Dimensions,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DoctorComponent from "@/components/DoctorComponent";
import { FontAwesome } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { whiteHeart } from "@/assets/icons/whiteHeart";
import { blueheart } from "@/assets/icons/blueHeart";
import { star } from "@/assets/icons/star";
import { search } from "@/assets/icons/search";
import { more } from "@/assets/icons/more";
import { LightleftArrow } from "@/assets/icons/left";
import HeaderComponent from "@/components/HeaderComponent";
import SearchComponent from "@/components/SearchComponent";
import FoundDoctorCount from "@/components/FoundDoctorCount";
import NofoundComponent from "@/components/NofoundComponent";
import RemovefavoritePopup from "@/components/RemovefavoritePopup";
import FilterPopup from "@/components/FilterSearchComponent";
import { StatusBar } from "expo-status-bar";
import NotFoundScreen from "@/app/+not-found";
import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

const tableName = "doctors";
const favoriteTable = "favorite_doctors";

interface imageMapProp {
  [key: string]: ReturnType<typeof require>;
}

interface iconMappingProp {
  [key: string]: ReactElement;
}
interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  hospital: string;
  rate: string;
  review: string;
  specialization: string;
  about: string;
}

export const iconMapping: iconMappingProp = {
  heart: <SvgXml xml={whiteHeart} />,
  star: <SvgXml xml={star} />,
};

function DoctorScreen() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showpopUp, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [showFilter, setShowfilter] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { theme, changeTheme } = useContext(ThemeContext);
  const [selectedSpecilization, setSelectedSpecilization] =
    useState<string>("All");
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [favoriteDoctors, setFavoriteDoctors] = useState<number[]>([]);
  const containerStyle =
    theme === "dark" ? styles.outerDark : styles.outerLight;
  const scrollbackColor =
    theme === "dark" ? styles.scrollDark : styles.scrollLight;
  const [loggeduser, setLoggedUser] = useState<string>();
  const [profile, setProfile] = useState<any>(null);
  const [patient_id, setPatient_id] = useState<string>();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("error fetching user");
      } else {
        setLoggedUser(user?.id);
      }
    };
    fetchUser();
  }, [loggeduser]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggeduser) {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("auth_id", loggeduser)
          .single();
        if (error) {
          console.error("error while retrieving profile", error);
        } else {
          setProfile(data);
          setPatient_id(data.id);
          // console.log(data)
        }
      }
    };
    fetchUserProfile();
  }, [loggeduser]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const { data: doctorData, error: doctorError } = await supabase
        .from("doctors")
        .select("*");
      if (doctorError) {
        setIsLoading(false);
        throw new Error("Error fetching data:" + doctorError.message);
      }

      const uniqueSpecialization = Array.from(
        new Set(doctorData.map((doctor) => doctor.specialization))
      );
      setSpecialization(["All", ...uniqueSpecialization]);

      const docIds = doctorData.map((doc) => doc.id);

      const { data: reviewData, error: reviewError } = await supabase
        .from("reviews")
        .select("*")
        .in("doctor_id", docIds);

      if (reviewError) {
        setIsLoading(false);
        console.error("Error fetching reviews:", reviewError);
        return;
      }

      const mergedData = doctorData.map((doctor) => {
        const reviews = reviewData.filter(
          (review) => review.doctor_id === doctor.id
        );

        const totalStars = reviews.reduce(
          (sum, review) => sum + parseFloat(review.stars),
          0
        );
        const result =
          reviews.length === 0 ? 0 : (totalStars / reviews.length).toFixed(1);

        return { ...doctor, reviews, result };
      });

      setDoctors(mergedData);
      setIsLoading(false);
    }

    fetchData();
  }, []);
  // console.log("this is retrived specilization:", specialization)
  useEffect(() => {
    const fetchFavoritesDoctor = async () => {
      if (patient_id) {
        const { data, error } = await supabase
          .from(favoriteTable)
          .select("*")
          .eq("patient", patient_id);
        if (error) {
          console.error("error while fetching ", error);
        }

        setFavoriteDoctors(
          data?.map((item: any) => item.favorite_doctor) || []
        );
      }
    };
    fetchFavoritesDoctor();
  }, [patient_id]);
  const handleSearchPressed = () => {
    setShowSearch(true);
  };
  const handleSearchSubmit = (text: string) => {
    setSearchTerm(text.toLowerCase());
  };

  const handleFilter = () => {
    setShowfilter(true);
  };

  const handleSpecializationChange = (specialization: string) => {
    setSelectedSpecilization(specialization);
    setSearchTerm("");
  };
  const handleAddfovorite = async (doctorId: number) => {
    const patientId = patient_id;
    const { error } = await supabase
      .from(favoriteTable)
      .insert({ patient: patientId, favorite_doctor: doctorId });
    if (error) {
      console.error("error while adding doctor to favorite", error);
      return;
    }
    setFavoriteDoctors((prev) => [...prev, doctorId]);
  };
  const updateFavoriteDoctors = async () => {
    const { data, error } = await supabase
      .from("favorite_doctors")
      .select("favorite_doctor")
      .eq("patient", patient_id);
    if (error) {
      console.error("Error fetching favorite doctors:", error);
    } else {
      setFavoriteDoctors(
        data.map((item: { favorite_doctor: number }) => item.favorite_doctor)
      );
    }
  };
  const handleIconClick = (doctor: Doctor, doctorId: number) => {
    if (favoriteDoctors.includes(doctor.id)) {
      setSelectedDoctor(doctor);
      setShowPopup(true);
    } else {
      handleAddfovorite(doctorId);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchSearchTerm =
      searchTerm.length > 0
        ? doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
    const matchSpecialization =
      selectedSpecilization === "All" ||
      doctor.specialization === selectedSpecilization;
    return matchSearchTerm && matchSpecialization;
  });

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <View>
        <View style={[styles.upper, containerStyle]}>
          {!showSearch ? (
            <HeaderComponent
              onSearchPressed={handleSearchPressed}
              headerText="Top Doctor"
            />
          ) : (
            <SearchComponent
              onSearchSubmit={handleSearchSubmit}
              filterAction={handleFilter}
            />
          )}
        </View>
        <View style={[styles.categoryBtnView, containerStyle]}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {specialization.map((specialization, index) => (
              <Pressable
                key={index}
                onPress={() => handleSpecializationChange(specialization)}
                style={[
                  styles.categoryBtn,
                  selectedSpecilization === specialization
                    ? styles.firstCategoryBtn
                    : {},
                ]}
              >
                <Text
                  style={[
                    styles.categoryBtnText,
                    selectedSpecilization === specialization
                      ? styles.firstCategoryBtnText
                      : {},
                  ]}
                >
                  {specialization}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={styles.foundDoctorView}>
          {showSearch && <FoundDoctorCount count={filteredDoctors.length} />}
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.scroll, scrollbackColor]}
            contentContainerStyle={{
              justifyContent: "center",

              paddingBottom: 150,
              paddingTop: 20,
            }}
          >
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor: any, index: number) => {
                return (
                  <View key={index} style={styles.componentView}>
                    <DoctorComponent
                      path={() =>
                        router.push({
                          pathname: "/ActionMenu/Booking/Doctor_details",
                          params: { id: doctor.id },
                        })
                      }
                      imageSource={{ uri: doctor.image }}
                      name={`${doctor.first_name} ${doctor.last_name}`}
                      iconComponent={
                        favoriteDoctors.includes(doctor.id) ? (
                          <SvgXml xml={blueheart} />
                        ) : (
                          <SvgXml xml={whiteHeart} />
                        )
                      }
                      professionalTitle={doctor.specialization}
                      hospital={doctor.hospital_name}
                      star={<SvgXml xml={star} />}
                      review={doctor.reviews.length}
                      rate={doctor.result}
                      addRemoveFavorite={() =>
                        handleIconClick(doctor, doctor.id)
                      }
                    />
                  </View>
                );
              })
            ) : (
              <NofoundComponent />
            )}
          </ScrollView>
        </View>
      </View>
      <RemovefavoritePopup
        userId={patient_id}
        cancel={() => setShowPopup(false)}
        visible={showpopUp}
        onClose={() => setShowPopup(false)}
        doctor={selectedDoctor}
        updateFavoriteDoctors={updateFavoriteDoctors}
      />
      <FilterPopup
        cancel={() => setShowfilter(false)}
        visible={showFilter}
        onClose={() => setShowfilter(false)}
      />
    </SafeAreaView>
  );
}

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  outerDark: {
    backgroundColor: "#181A20",
  },
  outerLight: {
    backgroundColor: "white",
  },
  upper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "7%",
    marginTop: "18%",
  },
  foundDoctorView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchComponent: {},
  upperInner: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    height: "100%",
  },
  categoryScroll: {},
  categoryBtnView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
    backgroundColor: "white",
  },
  categoryBtn: {
    borderWidth: 2,
    borderColor: "#246BFD",
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginLeft: 10,
  },
  firstCategoryBtn: {
    backgroundColor: "#246BFD",
  },
  firstCategoryBtnText: {
    color: "white",
  },
  categoryBtnText: {
    color: "#246BFD",
    fontSize: 16,
  },
  body: {
    width: "98%",
    backgroundColor: "#F7F7F7",
  },
  scroll: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  scrollDark: {
    backgroundColor: "#181A20",
  },
  scrollLight: {
    backgroundColor: "#F7F7F7",
  },
  searchView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moreOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Headstyle: {
    color: "#212121",
    fontWeight: "bold",
    fontSize: 20,
  },
  NotificationView: {
    width: "80%",
  },
  componentView: {
    marginBottom: "5%",
    width: "100%",
    height: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rightView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "25%",
  },
});
