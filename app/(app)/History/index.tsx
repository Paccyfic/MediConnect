import { MoreIcon } from "@/assets/icons/MoreCircleSvg";
import { SearchIcon } from "@/assets/icons/SearchSvg";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { ReactElement, useContext, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Image, ImageBackground, Text, View, FlatList,ScrollView } from "react-native";
import { SvgXml } from "react-native-svg";
import data from "@/app/(app)/History/history.json"
import NofoundComponent from "@/components/NofoundComponent";
import SearchComponent from "@/components/SearchComponent";
import Historyheader from "@/components/Historyheader";
import { DoctorComponentVoice,DoctorComponentVideo } from "@/components/CardComponent";
import MessageComponent from "@/components/MessageComponent";
import { rightArrow } from "@/assets/icons/Right_arrow";
import { ThemeContext } from "@/ctx/ThemeContext";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";




interface imageMapProp{
    [key:string]:ReturnType<typeof require>
}
interface iconMappingProp{
    [key :string]:ReactElement
}

const imageMap:imageMapProp = {
    'doctor1.png': require("@/assets/images/Doctors/doctor1.png"),
    'doctor2.png': require("@/assets/images/Doctors/doctor2.png"),
    'doctor3.png': require("@/assets/images/Doctors/doctor3.png"),
    'doctor4.png': require("@/assets/images/Doctors/doctor4.png"),
    'doctor5.png':require("@/assets/images/Doctors/doctor5.png")

}
export const iconMapping:iconMappingProp = {
    rightArrow: <SvgXml xml={rightArrow} />,
   
}

const index = () => {
  const {theme, changeTheme} = useContext(ThemeContext)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState(data.categories[0])
  const handleSearchSubmit = (text: string) => {
        setSearchTerm(text.toLowerCase())
    }
  const handleSearchPressed = () => {
        setShowSearch(true)
  }

  const handleCategoryPressed = (category: any) => {
    setSelectedCategory(category)
  }
  
  const filteredDoctors=searchTerm.length>0 ? selectedCategory.Doctors.filter(doctor=>doctor.name.toLowerCase().includes(searchTerm)):selectedCategory.Doctors
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        padding: 20,
        backgroundColor: theme === "dark" ? Colors.dark._1 :  Colors.others.white,

      }}
    >
      <StatusBar style={theme === "dark"? "light": "dark"} />
      
      <View style={{ paddingTop: 20, gap: 30 }}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {
            !showSearch ? (
              <Historyheader
                onSearchPressed={handleSearchPressed}
                headerText="History"
              
              />
            )
              : (
                <SearchComponent
                  onSearchSubmit={handleSearchSubmit}
                
                />
            )
         }
  

        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%"
          }}
        >
          {data.categories.map((category, index) =>
          
          <TouchableOpacity key={index} onPress={()=>handleCategoryPressed(category)} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Text
              style={[
                Typography.semiBold.xLarge,
                  { color:category===selectedCategory? "#246BFD": Colors.grayScale._400 ,marginBottom:3},
                
              ]}
            >
             {category.name}
              </Text>
              <View style={{width:110,backgroundColor:category===selectedCategory?"#246BFD":"#D3D3D3",height:category===selectedCategory?3:1,marginTop:5,marginBottom:5,borderRadius:10}}></View>
          </TouchableOpacity>
          
          )}
        </View>
      </View>
      <View style={{ backgroundColor: theme=== "dark" ? Colors.dark._1 : Colors.others.white, width: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom:100
          }}
        
        >
        {
          filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor: any, index: number) => (
              selectedCategory.name === "Messaging" ? (
                <MessageComponent
                  key={index}
                  imageSource={imageMap[doctor.imageSource]}
                  message={doctor.Message}
                  timeFrame={doctor.timeFrame}
                  time={doctor.time}
                  name={doctor.name}
                
                
                />
              ) :selectedCategory.name==="Voice Call"?
                (
                  
                  <DoctorComponentVoice
                    key={index}
                    imageSource={imageMap[doctor.imageSource]}
                    iconComponent={iconMapping[doctor.iconComponent]}
                    name={doctor.name}
                    method="Voice Call"
                    day={doctor.timeFrame}
                    time={doctor.time}
                    onPress={()=> router.push("History/VoiceCallHistory/[id]")}

                  />
                  ) : selectedCategory.name === "Video Call" ?
                    
                    (
                      <DoctorComponentVideo
                        key={index}
                        imageSource={imageMap[doctor.imageSource]}
                        iconComponent={iconMapping[doctor.iconComponent]}
                        name={doctor.name}
                        method="Video call"
                        day={doctor.timeFrame}
                        time={doctor.time}
                        onPress={()=> router.push("History/VideoCallHistory/[id]")}
                      
                      />

                    ):null
          ))
            
          ):
            (
              <NofoundComponent/>
              
          )
        }
       </ScrollView> 

</View>

    </View>
  );
};

export default index;

