import React, { useContext } from "react";
import Typography from "@/constants/Typography";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { blueHeart, fullyColoredBlueHeart } from "./UI/icons/blueHeart";
import { fullSmallBlueStar } from "./UI/icons/star";
import { moreGrayIcon } from "./UI/icons/circleWithDots";
import { Colors } from "@/constants/Colors";
import Chips from "./UI/ChipsComponent";
import { ThemeContext } from "@/ctx/ThemeContext";

interface ReviewProps  {
  id:string,
  image: {uri:string}
  names:string,
  review:string,
  recommend:string,
  stars:string,
  likes:number,
  onlike:() => void;
  daysAgo:string;
  likeicon?: () => React.JSX.Element;
}

const unLike = <SvgXml xml={blueHeart} />;

function ReviewerCardComponent ({image,names,review,recommend,likes,stars,onlike,daysAgo,likeicon}:ReviewProps){
  const { theme, changeTheme } = useContext(ThemeContext);

  const [isLike, setIsLike] = useState(false);
  function handleLike() {
    setIsLike(true);
  }
  
  return (
    
      
          
            <View style={{ gap: 10, marginBottom: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View style={{ width: 50, height: 50 }}>
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 100,
                      }}
                      source={image}
                    />
                  </View>
                  <Text
                    style={[
                      Typography.bold.large,
                      { color: theme === "dark" ? "white" : "black" },
                    ]}
                  >
                    {names}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <Chips
                    text={stars}
                    type="border"
                    size="medium"
                    leftIcon={() => <SvgXml xml={fullSmallBlueStar} />}
                    style={{ marginLeft: 10 }}
                  />
                  <View>
                    <SvgXml xml={moreGrayIcon} />
                  </View>
                </View>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ color: theme === "dark" ? "white" : "black" }}>
                  {review}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 40,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Pressable onPress={onlike}>
                    {likeicon && likeicon()}
                      
                    </Pressable>
                    <Text
                      style={[
                        Typography.medium.small,
                        { color: theme === "dark" ? "white" : "black" },
                      ]}
                    >
                      {likes}
                    </Text>
                  </View>
                  <Text style={{ color: theme === "dark" ? "white" : "black" }}>
                    
                    {daysAgo} 
                  </Text>
                </View>
              </View>
            </View>
          );
        
    
};

const styles = StyleSheet.create({
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

export default ReviewerCardComponent;
