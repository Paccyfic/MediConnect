import { View, Text } from "@/components/Themed";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFonts as useFontsExpo } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import {
  NotificationIcon,
  NotificationIconDark,
} from "@/assets/icons/Profile/Icons";
import { ThemeContext } from "@/ctx/ThemeContext";
import { blackHeart } from "@/components/UI/icons/blackHeart";
import { supabase } from "@/lib/supabase";
import { getUserImageUrl, fetchPatientData } from "@/utils/LoggedInUser";
import { Doctor, PatientTypes } from "@/constants/Types";
import DoctorComponent from "@/components/DoctorComponent";
import { star } from "@/assets/icons/star";
import { whiteHeart } from "@/assets/icons/whiteHeart";
import { blueheart } from "@/assets/icons/blueHeart";
import NofoundComponent from "@/components/NofoundComponent";
import { AuthContext, useAuth } from "@/ctx/AuthContext";
import RemovefavoritePopup from "@/components/RemovefavoriteIndexPopup";
import {
  DentistsIcon,
  GeneralIcon,
  MoreIconPureBlue,
  NeurologyIcon,
  NutritionistIcon,
  OpticianIcon,
  PediatricianIcon,
  RadiologyIcon,
} from "@/constants/icon";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [patientData, setPatientData] = useState<PatientTypes[]>([]);
  // near the other useState calls
  const [imageUrl, setImageUrl] = useState<{ name: string } | null>(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [setText] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [greeting, setGreeting] = useState("");
  const { authType, imageUrl: otherAuthImageUrl } = useAuth();
  const [showpopUp, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [selectedSpecilization, setSelectedSpecilization] =
    useState<string>("All");
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [patient_id, setPatient_id] = useState<string>();
  const [favoriteDoctors, setFavoriteDoctors] = useState<number[]>([]);
  const [loggeduser, setLoggedUser] = useState<string>();
  const [profile, setProfile] = useState<any>(null);
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = Dimensions.get("window");

  const [fontsLoaded] = useFontsExpo({
    "Urbanist-regular": require("@/assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-bold": require("@/assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-Semibold": require("@/assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-Medium": require("@/assets/fonts/Urbanist-Medium.ttf"),
  });
  const tableName = "doctors";
  const favoriteTable = "favorite_doctors";

  const CDNURL =
    "https://vbwbfflzxuhktdvpbspd.supabase.co/storage/v1/object/public/patients/";
  const scrollbackColor =
    theme === "dark" ? styles.scrollDark : styles.scrollLight;

  useEffect(() => {
    if (userId) {
      fetchPatientData(userId, setPatientData);
      getUserImageUrl("patients", userId, setImageUrl);
    }
  }, [userId]);

  useEffect(() => {
    if (imageUrl?.name) {
      setProfilePhoto(imageUrl.name);
    }
  }, [imageUrl]);

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

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 12 && hours < 17) {
        setGreeting("Good Afternoon");
      } else if (hours >= 17 || hours < 1) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Morning");
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const specializations = [
    { icon: GeneralIcon, text: "General Doctor" },
    { icon: DentistsIcon, text: "Dentist" },
    { icon: NutritionistIcon, text: "Nutritionist" },
    { icon: OpticianIcon, text: "Optician" },
    { icon: NeurologyIcon, text: "Neurologist" },
    { icon: PediatricianIcon, text: "Pediatrician" },
    { icon: RadiologyIcon, text: "Radiologist" },
    { icon: MoreIconPureBlue, text: "More" },
  ];

  const handleSpecializationChange = (specialization: string) => {
    if (specialization === "More") {
      router.push("/ActionMenu/AllDoctorScreen");
      return;
    }
    setSelectedSpecilization(specialization);
    setSearchTerm("");
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
  if (!fontsLoaded) {
    return null;
  }
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

  return (
    <View
      style={{
        backgroundColor: theme === "dark" ? "#181A20" : "#FFFFFF",
        padding: 2,
        paddingTop: 40,
      }}
    >
      {patientData && (
        <FlatList
          data={patientData}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: theme === "dark" ? "#181A20" : "#FFFFFF",
                marginLeft: "3%",
                marginTop: "5%",
              }}
            >
              <View style={{ borderRadius: 100, width: 70, height: 70 }}>
                <Image
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                  source={{
                    uri:
                      authType && authType !== "apple"
                        ? otherAuthImageUrl
                        : `${CDNURL  + patientData[0]?.image}`,
                      }}
                />
              </View>
              <View
                style={{
                  backgroundColor: theme === "dark" ? "#181A20" : "#FFFFFF",
                  marginLeft: "2%",
                }}
              >
                <Text
                  style={{
                    color: theme === "dark" ? "#E0E0E0" : "#757575",
                    fontFamily: "Urbanist-regular",
                  }}
                >
                  {" "}
                  {greeting} 👋
                </Text>
                <Text
                  style={{
                    color: theme === "dark" ? "#FFFFFF" : "#000000",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Urbanist-bold",
                  }}
                >
                  {item?.first_name + " " + item?.last_name}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: theme === "dark" ? "#181A20" : "#FFFFFF",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "35%",
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/ActionMenu/NotificationScreen")}
                >
                  <SvgXml
                    xml={
                      theme === "dark" ? NotificationIconDark : NotificationIcon
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    router.push("/ActionMenu/FavoriteDoctorScreen")
                  }
                  style={styles.heart}
                >
                  <SvgXml xml={theme === "dark" ? whiteHeart : blackHeart} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={{ height: "205%" }}
      >
        {/* <View
          style={{
            backgroundColor: theme === "dark" ? "#35383F" : "#F5F5F5",
            width: "90%",
            flexDirection: "row",
            gap: 18,
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "7%",
            marginLeft: "5%",
            marginRight: 30,
            padding: 15,
            borderRadius: 12,
            position: "relative",
          }}
        >
          <Image source={require("../../../assets/images/search.png")} />
          <TextInput
            placeholder="Search"
            onChangeText={(newText) => setText(newText)}
            style={styles.searchinput}
            placeholderTextColor={
              theme === "dark" ? "#757575" : "rgba(45,45,45,0.4)"
            }
          />
          <TouchableOpacity style={styles.filter}>
            <Image source={require("../../../assets/images/filter.png")} />
          </TouchableOpacity>
        </View> */}

        <View style={styles.frame}>
          <ImageBackground
            style={styles.FrameImage}
            source={require("../../../assets/images/Frame.png")}
          >
            <View style={styles.FrameText}>
              <Text style={styles.h1}>Medical Checks!</Text>
              <Text style={styles.body}>
                Check your health condition regularly to minimize the incidence
                of disease in the future.{" "}
              </Text>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => navigation.navigate("" as never)}
              >
                <Text style={styles.buttontext2}> Check Now </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.TxtContainer}>
          <Text
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#000000",
              fontFamily: "Urbanist-bold",
              fontSize: 19,
              marginLeft: "4%",
            }}
          >
            Doctor Speciality
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/ActionMenu/AllDoctorScreen")}
          >
            <Text style={styles.seeTxt}>See All</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            marginTop: 10,
            width: width,
            backgroundColor: theme === "dark" ? "#181A20" : "#ffffff",
          }}
        >
          {specializations.map((specialization, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSpecializationChange(specialization.text)}
              style={{
                alignItems: "center",
                gap: 10,
                marginTop: 5,
                padding: 5,
                marginBottom: 10,
                backgroundColor: theme === "dark" ? "#181A20" : "#ffffff",
              }}
            >
              <SvgXml
                xml={
                  specialization.icon === null
                    ? GeneralIcon
                    : specialization.icon
                }
              />
              <Text
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#000000",
                  fontFamily: "Urbanist-bold",
                  fontSize: 15,
                }}
              >
                {specialization.text.slice(0, 8) + "..."}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.TopDocs}>
          <Text
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#000000",
              fontFamily: "Urbanist-bold",
              fontSize: 19,
              marginLeft: "4%",
            }}
          >
            Top Doctors
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/ActionMenu/AllDoctorScreen")}
          >
            <Text style={styles.seeTxt}>See All</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginTop: 5,
            padding: 5,
            marginLeft: 10,
            marginBottom: 20,
            backgroundColor: theme === "dark" ? "#181A20" : "#ffffff",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        <ImageBackground
          style={{
            backgroundColor: theme === "dark" ? "#181A20" : "#EEEEEE",
            width: "100%",
            padding: 5,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.scroll, scrollbackColor]}
            contentContainerStyle={{
              justifyContent: "center",
              paddingBottom: 100,
              paddingTop: 20,
            }}
          >
            {filteredDoctors.length > 0 ? (
              filteredDoctors.splice(0, 5).map((doctor: any, index: number) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginBottom: "5%",
                      width: "100%",
                      height: 150,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: theme === "dark" ? "#181A20" : "#EEEEEE",
                    }}
                  >
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
        </ImageBackground>
      </ScrollView>
      <RemovefavoritePopup
        userId={patient_id}
        cancel={() => setShowPopup(false)}
        visible={showpopUp}
        onClose={() => setShowPopup(false)}
        doctor={selectedDoctor}
        updateFavoriteDoctors={updateFavoriteDoctors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: "#181A20",
    padding: 2,
    paddingTop: 40,
  },

  userImage: {
    width: 45,
    height: 45,
  },
  filter: {
    marginLeft: "3%",
  },
  heart: {
    marginLeft: 15,
  },
  searchinput: {
    color: "#757575",
    fontFamily: "Urbanist-regular",
    fontSize: 18,
    flex: 1,
  },
  frame: {
    backgroundColor: "transparent",
    marginRight: "0%",
    padding: 0,
    width: "100%",
    height: 200,
    marginLeft: "0%",
    alignItems: "center",
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
  FrameImage: {
    width: "101%",
    padding: 0,
    height: "100%",
    marginTop: "5%",
    marginLeft: "3%",
    shadowColor: "#A7C4FE",
    shadowOpacity: 5,
    flexDirection: "row",
  },
  FrameText: {
    backgroundColor: "transparent",
  },
  button2: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 100,
    height: 30,
    marginTop: "5%",
    marginLeft: "13%",
  },
  buttontext2: {
    color: "#246BFD",
    fontFamily: "Urbanist-Semibold",
    fontSize: 13,
  },

  h1: {
    marginTop: "10%",
    marginLeft: "13%",
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "Urbanist-bold",
    fontSize: 25,
    width: 185,
  },
  body: {
    fontFamily: "Urbanist-regular",
    fontSize: 12,
    backgroundColor: "transparent",
    color: "#FFFFFF",
    width: 194,
    marginTop: "5%",
    marginLeft: "13%",
  },
  TxtContainer: {
    flexDirection: "row",
    gap: 180,
    backgroundColor: "transparent",
    marginTop: "6%",
  },
  seeTxt: {
    color: "#246BFD",
    fontFamily: "Urbanist-bold",
    fontSize: 15,
  },
  specialityContainer1: {
    backgroundColor: "transparent",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    flexDirection: "row",
    gap: 40,
  },
  NameTxt: {
    backgroundColor: "transparent",
    marginLeft: "5%",
    marginTop: "2%",
    flexDirection: "row",
    gap: 40,
  },

  TopDocs: {
    flexDirection: "row",
    gap: 220,
    backgroundColor: "transparent",
    marginTop: "8%",
    marginBottom: "4%",
  },

  cardImage: {
    height: "93%",
    width: "30%",
    borderRadius: 20,
    //backgroundColor:'black'
  },

  DocDescription: {
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  DocHeart: {
    marginTop: "3%",
  },
  CardHeader: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },

  DocRating: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "6%",
  },
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
});
