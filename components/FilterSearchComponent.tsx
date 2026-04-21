import React, {
  ReactElement,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
  TextInput,
  Pressable,
  ImageURISource,
} from "react-native";
import Typography from "@/constants/Typography";
import { SvgXml } from "react-native-svg";
import { blueheart } from "@/assets/icons/blueHeart";
import { star } from "@/assets/icons/star";
import Removebtn from "./Removebtn";
import data from "../app/doctors.json";
import { overlay } from "react-native-paper";
import DoctorComponent from "./DoctorComponent";
import Ratebtn from "./Ratebtn";
import { Rating } from "react-native-elements";
import Chips from "./UI/ChipsComponent";
import { fullSmallBlueStar, fullSmallWhiteStar } from "./UI/icons/star";
import { ThemeContext } from "@/ctx/ThemeContext";

interface iconMappingProp {
  [key: string]: ReactElement;
}

interface RemovefavoritepopProps {
  visible: boolean;
  onClose: () => void;
  cancel: () => void;
}
export const iconMapping: iconMappingProp = {
  heart: <SvgXml xml={blueheart} />,
  star: <SvgXml xml={star} />,
};

function FilterPopup({ visible, onClose, cancel }: RemovefavoritepopProps) {
  const { theme, changeTheme } = useContext(ThemeContext);
  const outerBackgroundColor =
    theme === "dark" ? styles.viewDark : styles.viewLight;
  const titleColor = theme === "dark" ? styles.whiteTitle : styles.introColor;
  const horizontalColor =
    theme === "dark" ? styles.darkHorizontal : styles.greyHorizontal;
  const resetButtonColor = theme === "dark" ? "#35383F" : "#E9F0FF";
  const resetbtnTextColor = theme === "dark" ? "white" : "#246BFD";
  const [selectedCategory, setSelectedCategory] = useState(data.categories[0]);
  const [showpopUp, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedRating, setSelectedRating] = useState("All");
  const handleSelectedRating = (Rating: string) => {
    setSelectedRating(Rating);
  };
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  if (!visible) return null;
  return (
    <SafeAreaView style={styles.overlay}>
      <Animated.View
        style={[
          styles.outer,
          outerBackgroundColor,
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [0, 300],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.inner, outerBackgroundColor]}>
          <View style={styles.intro}>
            <Text style={[styles.introText, titleColor]}>Filter</Text>
          </View>
          <View style={[styles.horizontal, horizontalColor]}></View>
          <View style={styles.displayComponent}>
            <View style={styles.specialityView}>
              <View style={styles.titleView}>
                <Text style={[styles.title, titleColor]}>Speciality</Text>
              </View>
              <View style={[styles.categoryBtnView, outerBackgroundColor]}>
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
                  {data.categories.map((category: any, index: any) => (
                    <>
                      <Chips
                        key={index}
                        text={category.name}
                        type={
                          selectedCategory === category ? "filled" : "border"
                        }
                        onPress={() => handleCategoryChange(category)}
                        size="medium"
                        style={{ marginLeft: 10 }}
                      />
                    </>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.rateView}>
                <View style={styles.titleView}>
                  <Text style={[styles.title, titleColor]}>Rating</Text>
                </View>
                <View style={[styles.categoryBtnView, outerBackgroundColor]}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                    contentContainerStyle={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {["All", "5", "4", "3", "2", "1"].map((Rating, index) => (
                      <Chips
                        key={index}
                        text={Rating}
                        type={selectedRating === Rating ? "filled" : "border"}
                        onPress={() => handleSelectedRating(Rating)}
                        size="medium"
                        style={{ marginLeft: 10 }}
                        leftIcon={() =>
                          selectedRating === Rating ? (
                            <SvgXml xml={fullSmallWhiteStar} />
                          ) : (
                            <SvgXml xml={fullSmallBlueStar} />
                          )
                        }
                      />
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.horizontal, horizontalColor]}></View>
          <View style={styles.btnView}>
            <Removebtn
              action={cancel}
              backColor={resetButtonColor}
              text="Reset"
              textColor={resetbtnTextColor}
            />
            <Removebtn
              action={() => console.log("remove")}
              backColor="#246BFD"
              text="Apply"
              textColor="white"
            />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default FilterPopup;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(80, 85, 94, 0.8)",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  outer: {
    width: "100%",
    height: "45%",
    zIndex: 1000,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  viewDark: {
    backgroundColor: "#1F222A",
  },
  viewLight: {
    backgroundColor: "white",
  },
  intro: {
    width: "100%",
    height: 40,
    marginBottom: "5%",
    marginTop: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  introText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  whiteTitle: {
    color: "white",
  },
  introColor: {
    color: "#212121",
  },
  inner: {
    width: "90%",
  },
  btn: {
    height: 50,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleView: {
    marginBottom: 10,
  },
  rateView: {},
  btnInnerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  iconView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rateTextView: {},
  rateText: {},
  title: {
    fontWeight: "500",
    fontSize: 18,
  },
  scrollView: {},
  specialityView: {},
  displayComponent: {},
  btnView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  componentView: {
    backgroundColor: "#FDFDFD",
    marginBottom: "5%",
    width: "100%",
    height: 150,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  darkHorizontal: {
    borderColor: "#35383E",
  },
  greyHorizontal: {
    borderColor: "#EEEEEE",
  },
  horizontal: {
    width: "100%",
    borderWidth: 1,
    marginBottom: "6%",
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
});
