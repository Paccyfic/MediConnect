import React, { useContext, useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { Dropdown } from "react-native-element-dropdown";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  CalenderIcon,
  CalenderIconDark,
  DropDownIcon,
  DropDownIconDark,
  MessageIcon,
  MessageIconDark,
} from "@/assets/icons/Profile/Icons";
import Typography from "@/constants/Typography";
import { typedCountries } from "@/constants/Languages";
import { ThemeContext } from "@/ctx/ThemeContext";
import { supabase } from "@/lib/supabase";
import { fetchPatientData, getPatientData } from "@/utils/LoggedInUser";
import { User } from "@/utils/LoggedInUser";
import { router } from "expo-router";

interface PatientData {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  country: string;
  email: string;
  phone: string;
}
interface props {
  disabled?: boolean;
  editable?: boolean;
}

function EditProfile() {
  const [value, setValue] = useState<string>("____United States");
  const [isFocus, setIsFocus] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState<User>();
  const [patientData, setPatientData] = useState<PatientData[]>();
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState("");

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getPatientData(supabase, setUserData);
  }, []);

  useEffect(() => {
    const id: string = userData?.id as string;
    if (id) {
      fetchPatientData(id, setPatientData);
      if (userData) {
        setEmail(userData?.email as string);
        setPhone(userData?.phone as string);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (patientData) {
      setCountry(patientData[0]?.country as string);
      setFirstName(patientData[0]?.first_name as string);
      setLastName(patientData[0]?.last_name as string);
      setGender(patientData[0]?.gender as string);
      setBirthDate(patientData[0]?.date_of_birth as string);
      setId(patientData[0]?.id);
      setPhone(patientData[0]?.phone as string);
    }
  }, [patientData]);

  useEffect(() => {
    setBirthDate(`${formatDate(date)}`);
  }, [date]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email as string);
    };
    getUser();
  }, []);

  const countryNames: { label: string; value: string }[] = Object.keys(
    typedCountries
  ).map((key: string) => {
    return { label: typedCountries[key].name, value: typedCountries[key].name };
  });
   const addNotification = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          title: 'Account successfully updated',
          description: `You have successfully updated your profile`,
          patient_id:id,
          type: "account_setup",
          viewed:false
         
        });

      if (error) {
        console.log("Error while inserting notification ", error);
      }
    } catch (error) {
      console.log("Error while inserting notification ", error);
    }
  };


  const handleUpdate = async () => {
    try {
      const data = await supabase
        .from("patients")
        .update({
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          date_of_birth: birthDate,
          country: country,
          phone: phone,
        })
        .eq("id", id);

      const res = await supabase.auth.updateUser({ email: email });

      console.log(res);
      addNotification()

      if (data.error) throw data.error;
      alert("Profile updated successfully");
      router.back();
    } catch (error) {
      console.log(error);
      alert("Error updating profile");
    }
  };

  return (
    <>
      {patientData && userData && (
        <FlatList
          data={patientData}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor:
                  theme === "light" ? Colors.others.white : Colors.dark._1,
                height: "100%",
              }}
            >
              <View
                style={{
                  gap: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  height: "100%",
                }}
              >
                <TextInput
                  style={[
                    Typography.semiBold.medium,
                    {
                      backgroundColor:
                        theme === "light"
                          ? Colors.grayScale._50
                          : Colors.dark._2,
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      color:
                        theme === "light"
                          ? Colors.grayScale._900
                          : Colors.others.white,
                      paddingVertical: 15,
                    },
                  ]}
                  placeholderTextColor={Colors.grayScale._500}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
                <TextInput
                  style={[
                    Typography.semiBold.medium,
                    {
                      backgroundColor:
                        theme === "light"
                          ? Colors.grayScale._50
                          : Colors.dark._2,
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      color:
                        theme === "light"
                          ? Colors.grayScale._900
                          : Colors.others.white,
                      paddingVertical: 15,
                    },
                  ]}
                  placeholderTextColor={Colors.grayScale._500}
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                />
                <View
                  style={{
                    backgroundColor:
                      theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
                    borderRadius: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <TextInput
                    style={[
                      Typography.semiBold.medium,
                      {
                        color:
                          theme === "light"
                            ? Colors.grayScale._900
                            : Colors.others.white,
                        flexGrow: 1,
                        paddingVertical: 15,
                      },
                    ]}
                    placeholderTextColor={Colors.grayScale._500}
                    placeholder="Birth Date"
                    value={birthDate}
                    // onChangeText={setBirthDate}
                    editable={false}
                  />
                  <Pressable onPress={showDatepicker}>
                    <SvgXml
                      xml={theme === "light" ? CalenderIcon : CalenderIconDark}
                    />
                  </Pressable>
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
                <View
                  style={{
                    backgroundColor:
                      theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
                    borderRadius: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <TextInput
                    style={[
                      Typography.semiBold.medium,
                      {
                        color:
                          theme === "light"
                            ? Colors.grayScale._900
                            : Colors.others.white,
                        flexGrow: 1,
                        paddingVertical: 15,
                      },
                    ]}
                    placeholderTextColor={Colors.grayScale._500}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Pressable>
                    <SvgXml
                      xml={theme === "light" ? MessageIcon : MessageIconDark}
                    />
                  </Pressable>
                </View>
                <Dropdown
                  style={{
                    backgroundColor:
                      theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,
                  }}
                  placeholderStyle={[Typography.semiBold.medium]}
                  selectedTextStyle={[
                    Typography.semiBold.medium,
                    {
                      color:
                        theme === "light"
                          ? Colors.grayScale._900
                          : Colors.others.white,
                    },
                  ]}
                  containerStyle={{
                    borderRadius: 20,
                    backgroundColor:
                      theme === "light" ? Colors.others.white : Colors.dark._2,
                    borderWidth: 0,
                  }}
                  inputSearchStyle={{
                    height: 40,
                    fontSize: 16,
                    borderRadius: 10,
                  }}
                  data={countryNames}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select item" : "..."}
                  searchPlaceholder="Search..."
                  value={country}
                  search
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setCountry(item.value);
                    setIsFocus(false);
                  }}
                  renderRightIcon={() => (
                    <SvgXml
                      xml={theme === "light" ? DropDownIcon : DropDownIconDark}
                    />
                  )}
                  itemTextStyle={{
                    color:
                      theme === "light"
                        ? Colors.grayScale._900
                        : Colors.others.white,
                  }}
                />
                <TextInput
                  style={[
                    Typography.semiBold.medium,
                    {
                      backgroundColor:
                        theme === "light"
                          ? Colors.grayScale._50
                          : Colors.dark._2,
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      color:
                        theme === "light"
                          ? Colors.grayScale._900
                          : Colors.others.white,
                      paddingVertical: 15,
                    },
                  ]}
                  placeholderTextColor={Colors.grayScale._500}
                  placeholder="+250"
                  value={phone}
                  onChangeText={setPhone}
                />
                <TextInput
                  style={[
                    Typography.semiBold.medium,
                    {
                      backgroundColor:
                        theme === "light"
                          ? Colors.grayScale._50
                          : Colors.dark._2,
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      color:
                        theme === "light"
                          ? Colors.grayScale._900
                          : Colors.others.white,
                      paddingVertical: 15,
                    },
                  ]}
                  placeholderTextColor={Colors.grayScale._500}
                  placeholder="Gender"
                  value={gender}
                  onChangeText={setGender}
                />
                <View style={{ marginTop: "auto" }}>
                  <Button
                    title="Update"
                    onPress={handleUpdate}
                    // shadowColor={Colors.main.primary._500}
                    // backgroundColor={Colors.main.primary._500}
                  />
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={{
            height: "100%",
          }}
        />
      )}
    </>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.grayScale._50,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: Colors.grayScale._900,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
