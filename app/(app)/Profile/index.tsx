import Typography from "@/constants/Typography";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, FlatList, RefreshControl } from "react-native";
import { SvgXml } from "react-native-svg";
import OptionListing from "@/components/Profile/OptionListing";
import { Colors } from "@/constants/Colors";
import {
  ChevronRight,
  ChevronRightDark,
  HelpCenterIcon,
  HelpCenterIconDark,
  InviteFriendsIcon,
  InviteFriendsIconDark,
  LanguageIcon,
  LanguageIconDark,
  LogoutIcon,
  NotificationIcon,
  NotificationIconDark,
  PaymentIcon,
  PaymentIconDark,
  ProfileIcon,
  ProfileIconDark,
  SecurityIcon,
  SecurityIconDark,
  ThemeIcon,
  ThemeIconDark,
} from "@/assets/icons/Profile/Icons";
import { ThemeContext } from "@/ctx/ThemeContext";
import { router } from "expo-router";
import Switch from "@/components/UI/Switch";
import { getUserImageUrl, fetchPatientData } from "@/utils/LoggedInUser";
import { AuthContext, useAuth } from "@/ctx/AuthContext";
import SelectProfile from "@/components/UI/SelectProfile";
import { supabase } from "@/lib/supabase";
import uuid from "react-native-uuid";

const index = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [patientData, setPatientData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { userId } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);


  const CDNURL =
    "https://vbwbfflzxuhktdvpbspd.supabase.co/storage/v1/object/public/patients/";
  const { authType, imageUrl: otherAuthImageUrl, logout } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchPatientData(userId, setPatientData);
      getUserImageUrl("patients", userId, setImageUrl);
    }
  }, [userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    fetchPatientData(userId, setPatientData);
    setRefreshing(false)
  }

  useEffect(() => {
    if (patientData) {
      setImageUrl(
        authType && authType !== "apple"
          ? otherAuthImageUrl
          : `${CDNURL + patientData[0]?.image}`
      );
    }
  }, [patientData]);

  const [formData, setFormData] = useState({
    image: {
      name: "",
      mimeType: "",
      uri: "",
    },
  });

  const image =
    authType !== "email"
      ? otherAuthImageUrl
      : `${CDNURL + userId + "/" + profilePhoto}`;

  async function handleImagePicker(name: string, value: object) {
    try {
      const res = await fetch(value?.uri);
      const arrayBuffer = await res.arrayBuffer();

      const imageName = userId + "/" + uuid.v4();

      await supabase.storage.from("patients").upload(imageName, arrayBuffer, {
        contentType: value?.mimeType ?? "image/jpeg",
      });

      const res1 = await supabase
        .from("patients")
        .update({
          image: imageName,
        })
        .eq("auth_id", userId);

      setImageUrl(CDNURL + imageName);
    } catch (err) {
      console.log(err);
    }

    setFormData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  console.log(imageUrl);

  return (
    <View>
      {patientData && (
        <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />}
          data={patientData}
          renderItem={({ item }) => (
            <View
              style={{
                height: "100%",
                backgroundColor:
                  theme === "light" ? Colors.others.white : Colors.dark._1,
              }}
            >
              <View
                style={{
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <SelectProfile
                  image={{
                    uri:  `${CDNURL  + patientData[0]?.image}`,
                    name: "",
                    mimeType: "",
                  }}
                  onChange={handleImagePicker}
                />
                <Text
                  style={[
                    Typography.bold.xxLarge,
                    {
                      color:
                        theme === "light"
                          ? Colors.grayScale._900
                          : Colors.others.white,
                    },
                  ]}
                >
                  {item?.first_name + " " + item?.last_name}
                </Text>
                <Text
                  style={[
                    Typography.semiBold.medium,
                    {
                      color:
                        theme === "light"
                          ? Colors.grayScale._900
                          : Colors.others.white,
                    },
                  ]}
                >
                  {!item?.phone ? "add your phone number" : item?.phone}
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: Colors.grayScale._200,
                  marginHorizontal: 24,
                  marginBottom: 20,
                }}
              ></View>

              <View style={{ gap: 20, width: "100%" }}>
                <OptionListing
                  onPress={() => {
                    router.push("/(app)/Profile/EditProfile");
                  }}
                  title="Edit Profile"
                  icon={() => {
                    return (
                      <SvgXml
                        xml={theme === "light" ? ProfileIcon : ProfileIconDark}
                        width={30}
                      />
                    );
                  }}
                  rightComponent={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? ChevronRight : ChevronRightDark
                        }
                        width={30}
                      />
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                />
                <OptionListing
                  title="Notification"
                  onPress={() => {
                    router.push("/(app)/Profile/Notification");
                  }}
                  icon={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light"
                            ? NotificationIcon
                            : NotificationIconDark
                        }
                        width={30}
                      />
                    );
                  }}
                  rightComponent={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? ChevronRight : ChevronRightDark
                        }
                        width={30}
                      />
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                />
                <OptionListing
                  title="Payment"
                  onPress={() => {
                    router.push("/(app)/Profile/Payment");
                  }}
                  icon={() => {
                    return (
                      <SvgXml
                        xml={theme === "light" ? PaymentIcon : PaymentIconDark}
                        width={30}
                      />
                    );
                  }}
                  rightComponent={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? ChevronRight : ChevronRightDark
                        }
                        width={30}
                      />
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                />
                <OptionListing
                  title="Security"
                  onPress={() => {
                    router.push("/(app)/Profile/Security");
                  }}
                  icon={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? SecurityIcon : SecurityIconDark
                        }
                        width={30}
                      />
                    );
                  }}
                  rightComponent={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? ChevronRight : ChevronRightDark
                        }
                        width={30}
                      />
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                />
                <OptionListing
                  title="Language"
                  onPress={() => {
                    router.push("/(app)/Profile/Languages");
                  }}
                  icon={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? LanguageIcon : LanguageIconDark
                        }
                        width={30}
                      />
                    );
                  }}
                  rightComponent={() => {
                    return (
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text
                          style={[
                            Typography.semiBold.medium,
                            {
                              color:
                                theme === "light"
                                  ? Colors.grayScale._900
                                  : Colors.others.white,
                            },
                          ]}
                        >{`English (US)`}</Text>
                        <SvgXml
                          xml={
                            theme === "light" ? ChevronRight : ChevronRightDark
                          }
                          width={30}
                        />
                      </View>
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                />
                <OptionListing
                  title="Dark Mode"
                  icon={() => {
                    return (
                      <SvgXml
                        xml={theme === "light" ? ThemeIcon : ThemeIconDark}
                        width={30}
                      />
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                  rightComponent={() => {
                    return (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Switch
                          active={theme === "dark"}
                          onPress={() => {
                            const newTheme =
                              theme === "light" ? "dark" : "light";
                            changeTheme(newTheme);
                            console.log("Changed theme");
                          }}
                        />
                        <SvgXml
                          xml={
                            theme === "light" ? ChevronRight : ChevronRightDark
                          }
                          width={30}
                        />
                      </View>
                    );
                  }}
                />
                <OptionListing
                  title="Help Center"
                  onPress={() => {
                    router.push("/(app)/Profile/HelpCenter");
                  }}
                  icon={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light"
                            ? HelpCenterIcon
                            : HelpCenterIconDark
                        }
                        width={30}
                      />
                    );
                  }}
                  rightComponent={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? ChevronRight : ChevronRightDark
                        }
                        width={30}
                      />
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                />
                <OptionListing
                  title="Invite Friends"
                  onPress={() => {
                    router.push("/(app)/Profile/InviteFriends");
                  }}
                  icon={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light"
                            ? InviteFriendsIcon
                            : InviteFriendsIconDark
                        }
                        width={30}
                      />
                    );
                  }}
                  rightComponent={() => {
                    return (
                      <SvgXml
                        xml={
                          theme === "light" ? ChevronRight : ChevronRightDark
                        }
                        width={30}
                      />
                    );
                  }}
                  textColor={
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white
                  }
                />
                <OptionListing
                  title="Logout"
                  textColor={Colors.others.red}
                  onPress={logout}
                  icon={() => {
                    return <SvgXml xml={LogoutIcon} width={30} />;
                  }}
                  // textColor={Colors.status.error}
                />
              </View>
            </View>
          )}
          style={{
            height: "100%",
            backgroundColor:
              theme === "light" ? Colors.others.white : Colors.dark._1,
          }}
          contentContainerStyle={{
            gap: 15,
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        />
      )}
    </View>
  );
};

export default index;
