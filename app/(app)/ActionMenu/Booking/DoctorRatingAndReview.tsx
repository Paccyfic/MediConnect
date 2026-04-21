import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { SvgXml } from "react-native-svg";
import ReviewerCardComponent from "@/components/ReviewerCardComponent";
import { LeftArrow } from "@/components/UI/Icons";
import { moreGrayIcon } from "@/components/UI/icons/circleWithDots";
import { fullSmallBlueStar, fullSmallWhiteStar } from "@/components/UI/icons/star";
import Chips from "@/components/UI/ChipsComponent";
import { backArrowBlack, backArrowWhite } from "@/constants/icon";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/ctx/ThemeContext";
import { supabase } from "@/lib/supabase";
import NofoundComponent from "@/components/NofoundComponent";
import { fetchPatientData, getPatientData, getUserImageUrl } from "@/utils/LoggedInUser";
import { blueHeart, fullyColoredBlueHeart } from "@/components/UI/icons/blueHeart";

interface Review {
  id: string;
  patient_id: string;
  doctor_id: string;
  review: string;
  recommend: string;
  stars: string;
  likes: number;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    image: string;
  };
}

const DoctorRatingAndReview = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedRatestars, setSelectedRatestars] = useState<string>("All");
  const [ratestars, setRatestars] = useState<string[]>([]);
  const [isLike, setIsLike] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const { id } = useLocalSearchParams();
  const [patientdata, setPatientData] = useState(null);
  const [userData, setUserData] = useState<[]>([]);
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  const CDNURL = "https://vbwbfflzxuhktdvpbspd.supabase.co/storage/v1/object/public/patients/";

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); 
      const { data, error } = await supabase.from("reviews").select("*").eq("doctor_id", id);

      if (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
        return;
      }

      const userIds = data.map((review) => review.patient_id);

      const { data: patientsData, error: patientsError } = await supabase
        .from("patients")
        .select("*")
        .in("id", userIds);

      if (patientsError) {
        console.error("Error fetching patients:", patientsError);
        setIsLoading(false); 
        return;
      }

      const imageUrlObject: Record<string, FileObject[]> = {};
      const profilePhotoObject: Record<string, string | null> = {};

      for (const patient of patientsData) {
        

        const { data: imageData, error: imageError } = await supabase.storage
          .from("patients")
          .list(patient.auth_id + "/", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        if (imageError) {
          console.error(`Error fetching images for patient ${patient.id}:`, imageError);
          profilePhotoObject[patient.id] = null;
          continue;
        }

       

        imageUrlObject[patient.id] = imageData || [];

        if (imageData && imageData.length > 0) {
          const { data } = supabase.storage
            .from("patients")
            .getPublicUrl(`${patient.auth_id}/${imageData[0].name}`);

          profilePhotoObject[patient.id] = data.publicUrl;
        } else {
          console.log(`No images found for patient ${patient.id}`);
          profilePhotoObject[patient.id] = null;
        }
      }

      setImageUrl(imageUrlObject);
      setProfilePhoto(profilePhotoObject);


      const mergedData = data.map((review) => ({
        ...review,
        user: patientsData.find((user) => user.id === review.patient_id)!,
        userImages: imageUrlObject[review.patient_id] || [],
        profilePhoto: profilePhotoObject[review.patient_id],
      }));

      setReviews(mergedData);
      setRatestars(["All", "5", "4", "3", "2", "1"]);
      setIsLoading(false); 
    }

    fetchData();
  }, [id]);

  const handleRateChange = (stars: string) => {
    setSelectedRatestars(stars);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchRatestars = selectedRatestars === "All" || review.stars == selectedRatestars;
    return matchRatestars;
  });

  const calculateDaysAgo = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const differenceInTime = now.getTime() - createdDate.getTime();
    const daysAgo = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (daysAgo === 0) {
      return "Today";
    } else if (daysAgo === 1) {
      return "1 day ago";
    } else {
      return `${daysAgo} days ago`;
    }
  };

  const handleLike = async (reviewId: string) => {
    setLikedReviews((prevLikedReviews) => ({
      ...prevLikedReviews,
      [reviewId]: !prevLikedReviews[reviewId],
    }));

    const { data: review, error: fetchError } = await supabase
      .from("reviews")
      .select("likes")
      .eq("id", reviewId)
      .single();

    if (fetchError) {
      console.error("Error fetching current likes:", fetchError);
      return;
    }

    const newIsLike = !likedReviews[reviewId];
    const newLikes = newIsLike ? (review.likes || 0) + 1 : (review.likes || 0) - 1;

    const { data, error: updateError } = await supabase
      .from("reviews")
      .update({ likes: newLikes })
      .eq("id", reviewId)
      .single();

    if (updateError) {
      console.error("Error updating likes:", updateError);
      return;
    }

    setReviews((prevReviews) =>
      prevReviews.map((review) => (review.id === reviewId ? { ...review, likes: newLikes } : review))
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalStars = reviews.reduce((sum, review) => sum + parseFloat(review.stars), 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 20,
        backgroundColor: theme === "dark" ? Colors.dark._1 : Colors.others.white,
      }}
    >
      <SafeAreaView>
        <View style={styles.navBar}>
          <View style={styles.leftSide}>
            <Pressable onPress={() => router.back()}>
              <SvgXml xml={theme === "dark" ? backArrowWhite : backArrowBlack} />
            </Pressable>
            <View>
              <Text
                style={[
                  Typography.heading._4,
                  { color: theme === "dark" ? "white" : "black" },
                ]}
              >
                {calculateAverageRating()} ({reviews.length})
              </Text>
            </View>
          </View>
          <View style={styles.rightSide}>
            <SvgXml xml={moreGrayIcon} />
          </View>
        </View>
      </SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {ratestars.map((ratestar, index) => (
            <Chips
              key={index}
              text={ratestar}
              type={selectedRatestars === ratestar ? "filled" : "border"}
              size="medium"
              leftIcon={() =>
                selectedRatestars === ratestar ? (
                  <SvgXml xml={fullSmallWhiteStar} />
                ) : (
                  <SvgXml xml={fullSmallBlueStar} />
                )
              }
              onPress={() => handleRateChange(ratestar)}
              style={{ marginRight: 10 }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ marginVertical: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.main.primary._500} /> 
          ) : filteredReviews.length > 0 ? (
            filteredReviews.map((review: any, index: any) => (
              <View key={index}>
                <ReviewerCardComponent
                  names={`${review.user.first_name} ${review.user.last_name}`}
                  review={review.review}
                  likes={review.likes}
                  stars={review.stars}
                  image={{ uri: review.profilePhoto }}
                  recommend={review.recommend}
                  onlike={() => handleLike(review.id)}
                  likeicon={() =>
                    likedReviews[review.id] ? (
                      <SvgXml xml={fullyColoredBlueHeart} />
                    ) : (
                      <SvgXml xml={blueHeart} />
                    )
                  }
                  daysAgo={calculateDaysAgo(review.created_at)}
                />
              </View>
            ))
          ) : (
            <NofoundComponent />
          )}
        </ScrollView>
      </View>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  individualCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
    alignContent: "center",
    margin: 10,
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  drName: {
    borderColor: Colors.others.black,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  appContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  ratings: {
    flexDirection: "row",
    gap: 10,
    borderColor: Colors.main.primary._500,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
});

export default DoctorRatingAndReview;
