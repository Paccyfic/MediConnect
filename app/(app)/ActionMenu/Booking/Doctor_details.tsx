import React, { useContext } from "react";
import { SvgXml } from "react-native-svg";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useEffect,useState } from "react";
import { View } from "react-native";
import Typography from "@/constants/Typography";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { router,useLocalSearchParams, useNavigation } from "expo-router";
import { blueHeart, fullyColoredBlueHeart } from "@/components/UI/icons/blueHeart";
import { bluePeopleIcon } from "@/components/UI/icons/bluePeople";
import { statisticIcon } from "@/components/UI/icons/statistics";
import { halfTransparentStar } from "@/components/UI/icons/halfTransparentStart";
import { blueMessageIcon } from "@/components/UI/icons/blueMessage";
import { ThemeContext } from "@/ctx/ThemeContext";
import Button from "@/components/UI/Button";
import { supabase } from "@/lib/supabase";
import HeaderComponent from "@/components/HeaderComponent";
import ReviewerCardComponent from "@/components/ReviewerCardComponent";
import { StatusBar } from "expo-status-bar";

interface Doctor{
    id: number,
    first_name: string,
    last_name: string,
    hospital_name: string,
    rate: string,
    review: string,
    specialization: string,
  about: string,
  image:string
}
interface Review{
  id:string,
  patient_id:string,
  doctor_id:string,
  review:string,
  recommend:string,
  stars:string,
  likes:number,
  created_at:string,
  user: {
    id: string;
    first_name: string;
    last_name: string;
    image: string;
  };
}


const DoctorDetails = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [doctor,setDoctors]=useState<Doctor|null>(null)
  const [imageUrl, setImageUrl] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState("");
  const { id } = useLocalSearchParams()
  const navigation=useNavigation()
 useEffect(() => {
  async function fetchDoctorData() {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq("id", id)
      .single();

    if (error) {
      console.error('Error fetching doctor data:', error);
      return;
    }
    setDoctors(data);
    navigation.setOptions({ headerTitle: `${data?.first_name} ${data?.last_name}` });
  }

  fetchDoctorData();
}, [id]);

useEffect(() => {
  async function fetchReviews() {
    try {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq("doctor_id", id);

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        return;
      }

      const patientIds = [...new Set(reviewsData.map(review => review.patient_id))];

      const { data: patientsData, error: patientsError } = await supabase
        .from("patients")
        .select("*")
        .in("id", patientIds);

      if (patientsError) {
        console.error("Error fetching patient data:", patientsError);
        return;
      }

      const profileImagePromises = patientIds.map(patientId =>
        supabase.storage
          .from('patients')
          .list(`${patientId}/`, {
            limit: 1,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          })
      );

      const profileImages = await Promise.all(profileImagePromises);

      const profileImageMap: { [key: string]: string } = {};
      profileImages.forEach((result, index) => {
        if (!result.error && result.data.length > 0) {
          profileImageMap[patientIds[index]] = result.data[0].name;
        }
      });

      const mergedData = reviewsData.map(review => {
        const patient = patientsData.find(patient => patient.id === review.patient_id);
        const profilePhoto = profileImageMap[review.patient_id];
        return { ...review, user: patient, profilePhoto };
      });

      setReviews(mergedData);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  }

  fetchReviews();
}, [id]);


 const [reviews,setReviews] =useState<Review[]>([]);
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq("doctor_id", id)

if (error) {
return;
        }
        const userIds = data.map(review => review.patient_id);

        const { data: patientsData, error: patientsError } = await supabase
          .from("patients")
          .select("*")
          .in("id", userIds);
  
        if (patientsError) {
          console.error("Error fetching patients:", patientsError);
          return;
        }
                
        const imageUrlObject: Record<string, FileObject[]> = {};
        const profilePhotoObject: Record<string, string | null> = {};

        for (const patient of patientsData) {
          const path = patient.auth_id + '/';
          
          const { data: imageData, error: imageError } = await supabase
            .storage
            .from("patients")
            .list(patient.auth_id + '/', {
              limit: 100,
              offset: 0,
              sortBy: { column: 'name', order: 'asc' },
            });
        
          if (imageError) {
            console.error(`Error fetching images for patient ${patient.id}:`, imageError);
            profilePhotoObject[patient.id] = null;
            continue;
          }
                
          imageUrlObject[patient.id] = imageData || [];
          
          if (imageData && imageData.length > 0) {
            const { data } = supabase
              .storage
              .from("patients")
              .getPublicUrl(`${patient.auth_id}/${imageData[0].name}`);
        
            profilePhotoObject[patient.id] = data.publicUrl;
          } else {
            profilePhotoObject[patient.id] = null;
          }
        }

        setImageUrl(imageUrlObject);
        setProfilePhoto(profilePhotoObject);
        const mergedData = data.map(review => ({
          ...review,
          user: patientsData.find(user => user.id === review.patient_id)!,
          userImages: imageUrlObject[review.patient_id] || [],
          profilePhoto: profilePhotoObject[review.patient_id]
        }));

        setReviews(mergedData);
        }

fetchData();
}, [id])

const calculateDaysAgo = (createdAt:string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const differenceInTime = now.getTime() - createdDate.getTime();
  const daysAgo = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
  if (daysAgo === 0) {
    return 'Today';
  } else if (daysAgo === 1) {
    return '1 day ago';
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
    prevReviews.map((review) =>
      review.id === reviewId ? { ...review, likes: newLikes } : review
    )
  );
};
const calculateAverageRating = () => {
  if (reviews.length === 0) return 0;
  const totalStars = reviews.reduce((sum, review) => sum + parseFloat(review.stars), 0);
  return (totalStars / reviews.length).toFixed(1); 
};
const visibleReviews =  reviews.slice(0, 1);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? Colors.dark._1 : Colors.others.white,
        paddingTop:40
      }}
    >
      <ScrollView style={{  backgroundColor: theme === "dark" ? Colors.dark._1 : Colors.others.white,}}>
        <View style={[styles.container, { backgroundColor: theme === "dark" ? Colors.dark._1 : Colors.others.white,}]}>
          <StatusBar style={theme === "light"? "dark": "light"} backgroundColor={ theme === "dark" ? Colors.dark._1 : Colors.others.white}/>
          <HeaderComponent
          headerText={doctor?.first_name??"Doctor"}
          />
          <View
            style={[
              styles.individualCard,
              { backgroundColor: theme === "dark" ? "#1F222A" : "#FFFFFF" },
            ]}
          >       

            <View style={{ width: 100, height: 100 }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri:doctor?.image}}
              />
            </View>

            <View>
              <Text
                style={[
                  styles.drName,
                  Typography.bold.xLarge,
                  {
                    color: theme === "dark" ? Colors.others.white : "#212121",
                  },
                ]}
              >
                {doctor?.first_name} {doctor?.last_name}
              </Text>
              <View style={{ flex: 1, justifyContent: "space-around" }}>
                <Text
                  style={[
                    Typography.medium.small,
                    {
                      color: theme === "dark" ? Colors.others.white : "#212121",
                    },
                  ]}
                >
                   {doctor?.specialization} 
                </Text>
                <Text
                  style={[
                    Typography.medium.small,
                    {
                      color: theme === "dark" ? Colors.others.white : "#212121",
                    },
                  ]}
                >
                    {doctor?.hospital_name}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.appContainer]}>
            <View style={{ alignItems: "center", gap: 8 }}>
              <View
                style={{
                  backgroundColor: "rgba(36, 107, 253, 0.1)",
                  borderRadius: 100,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                }}
              >
                <SvgXml xml={bluePeopleIcon} />
              </View>
              <Text
                style={[
                  Typography.bold.xLarge,
                  { color: Colors.main.primary._500 },
                ]}
              >
                5.000+
              </Text>
              <Text
                style={{
                  color: theme === "dark" ? Colors.others.white : "#212121",
                }}
              >
                patients
              </Text>
            </View>

            <View style={{ alignItems: "center", gap: 8 }}>
              <View
                style={{
                  backgroundColor: "rgba(36, 107, 253, 0.1)",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  borderRadius: 100,
                }}
              >
                <SvgXml xml={statisticIcon} />
              </View>
              <Text
                style={[
                  Typography.bold.xLarge,
                  { color: Colors.main.primary._500 },
                ]}
              >
                10
              </Text>
              <Text
                style={{
                  color: theme === "dark" ? Colors.others.white : "#212121",
                }}
              >
                years exp...
              </Text>
            </View>

            <View style={{ alignItems: "center", gap: 5 }}>
              <View
                style={{
                  backgroundColor: "rgba(36, 107, 253, 0.1)",
                  borderRadius: 100,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                }}
              >
                <SvgXml xml={halfTransparentStar} />
              </View>
              <Text
                style={[
                  Typography.bold.xLarge,
                  { color: Colors.main.primary._500 },
                ]}
              >
                 {calculateAverageRating()}
              </Text>
              <Text
                style={{
                  color: theme === "dark" ? Colors.others.white : "#212121",
                }}
              >
                rating
              </Text>
            </View>
            <View style={{ alignItems: "center", gap: 5 }}>
              <View
                style={{
                  backgroundColor: "rgba(36, 107, 253, 0.1)",
                  borderRadius: 100,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                }}
              >
                <SvgXml xml={blueMessageIcon} />
              </View>
              <Text
                style={[
                  Typography.bold.large,
                  { color: Colors.main.primary._500 },
                ]}
              >
                {
                  reviews.length
                }
              </Text>
              <Text
                style={{
                  color: theme === "dark" ? Colors.others.white : "#212121",
                }}
              >
                reviewers
              </Text>
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={[
                Typography.heading._5,
                {
                  color: theme === "dark" ? Colors.others.white : "#212121",
                },
              ]}
            >
              About me
            </Text>
            <Text
              style={[
                Typography.medium.medium,
                {
                  lineHeight: 22,
                  color: theme === "dark" ? Colors.others.white : "#212121",
                  letterSpacing: 0.2,
                },
              ]}
            >
              {doctor?.about}
              <Text style={{ color: Colors.main.primary._500 }}>view more</Text>
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={[
                Typography.heading._5,
                {
                  color: theme === "dark" ? Colors.others.white : "#212121",
                },
              ]}
            >
              Working Time
            </Text>
            <Text
              style={{
                color: theme === "dark" ? Colors.others.white : "#212121",
              }}
            >
              Monday - Friday, 08.00 AM - 20.00 PM
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[
                  Typography.heading._5,
                  {
                    color: theme === "dark" ? Colors.others.white : "#212121",
                  },
                ]}
              >
                Reviews
              </Text>
              <Pressable
                onPress={() =>
                  router.push({pathname:"/ActionMenu/Booking/DoctorRatingAndReview",params:{id:id}})
                }
              >
                <Text
                  style={[
                    Typography.heading._5,
                    { color: Colors.main.primary._500 },
                  ]}
                >
                  See All
                </Text> 
              </Pressable>
            </View>

            <View>
            {visibleReviews.length > 0 ? (                            
                            visibleReviews.map((review: any, index: any) =>
                              <View  key={index} >
                                

            <ReviewerCardComponent
                  names={`${review.user.first_name} ${review.user.last_name}`}
                  review={review.review}
                  likes={review.likes}
                  stars={review.stars}
                  image={{ uri: review.profilePhoto}}
                  recommend={review.recommend}
                  onlike={()=> handleLike(review.id)}
                  likeicon={() => likedReviews[review.id] ? <SvgXml xml={fullyColoredBlueHeart}/> : <SvgXml xml= {blueHeart}/>}
                  daysAgo={calculateDaysAgo(review.created_at)}
                />
                </View>
              )
                            
            ) : (
              <Text style={[Typography.semiBold.large, 
               {color: theme === "dark" ? Colors.others.white : "#212121",}
              ] }> No available reviews</Text>   
     )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: 118,
          padding: 24,
        }}
      >
        <Button
          title="Book Appointment"
          onPress={() => router.push({ pathname:"/ActionMenu/Booking/BookingAppointment",params:{id:id}})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 0,
    gap: 28,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
    gap: 20,
    alignContent: "center",
    padding: 10,
    borderRadius: 10,
  },

  drName: {
    borderColor: "rgba(83, 83, 83, 0.4)",
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
    alignItems: "center",
    gap: 10,
    borderColor: Colors.main.primary._500,
    borderWidth: 3,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
});

export default DoctorDetails;
