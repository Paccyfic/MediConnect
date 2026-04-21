import React from "react";
import { useContext, useState } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Pressable, View, StyleSheet,TextInput, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import { LeftArrow } from "@/components/UI/Icons";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { router } from "expo-router";
import { RadioButton } from 'react-native-paper';

export default function Selectreason(){
    const { theme, changeTheme } = useContext(ThemeContext);
    const [selectedValue, setSelectedValue] = useState('option1');
    return(
        <>
      <View style={theme === "dark" ? styles.containerdark : styles.container}>
      <Pressable onPress={()=> router.back()}
        style={theme === "dark" ? styles.headerdark : styles.header}>
          <LeftArrow
            fillColor={
              theme === "dark" ? Colors.others.white : Colors.grayScale._900
            }
          />
          <Text
            style={[
              Typography.heading._4,
              {
                color:
                  theme === "dark"
                    ? Colors.others.white
                    : Colors.grayScale._900,
              },
            ]}
          >
            Reschedule Appointment
          </Text>
        </Pressable>
        <Text style={[Typography.heading._5,{color: theme==='light'?  Colors.grayScale._900: Colors.others.white,alignSelf:"flex-start"}]}>Reason for Schedule Change</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <RadioButton 
        value="option1"
        status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
        onPress={() => setSelectedValue('option1')}
        color={selectedValue === 'option1' ? Colors.main.primary._500 : Colors.main.primary._500}
        /><Text style={[Typography.medium.xLarge,{color: theme==='light'?  Colors.grayScale._900: Colors.others.white}]}>I'm having a schedule clash</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <RadioButton 
        value="option2"
        status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
        onPress={() => setSelectedValue('option2')}
        color={ Colors.main.primary._500 }
        /><Text style={[Typography.medium.xLarge,{color: theme==='light'?  Colors.grayScale._900: Colors.others.white}]}>I'm not available on schedule</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <RadioButton 
        value="option3"
        status={selectedValue === 'option3' ? 'checked' : 'unchecked'}
        onPress={() => setSelectedValue('option3')}
        color={ Colors.main.primary._500}
        /><Text style={[Typography.medium.xLarge,{color: theme==='light'?  Colors.grayScale._900: Colors.others.white}]}>I have a activity that can't be left behind</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <RadioButton 
        value="option4"
        status={selectedValue === 'option4' ? 'checked' : 'unchecked'}
        onPress={() => setSelectedValue('option4')}
        color={ Colors.main.primary._500}
        /><Text style={[Typography.medium.xLarge,{color: theme==='light'?  Colors.grayScale._900: Colors.others.white}]}>I don't want to tell</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <RadioButton 
        value="option5"
        status={selectedValue === 'option5' ? 'checked' : 'unchecked'}
        onPress={() => setSelectedValue('option5')}
        color={ Colors.main.primary._500}
        /><Text style={[Typography.medium.xLarge,{color: theme==='light'?  Colors.grayScale._900: Colors.others.white}]}>Others</Text>
      </View>
      {  selectedValue==='option5'? <TextInput
    multiline={true}
    numberOfLines={5}
    style={[Typography.semiBold.medium,{ width: '100%',height:200,backgroundColor: theme==='light'? Colors.grayScale._100: Colors.dark._2,borderRadius:16, }]}
    placeholder="Write Your other reason"
    placeholderTextColor={theme==='light'?  Colors.grayScale._900: Colors.others.white}
    

    /> :<></>}
      
      <TouchableOpacity
        onPress={()=> router.push("(app)/Appointments/ReschedualAppointment/rescheduleDate")}
          style={{
            width: '100%',
            height: 58,
            borderRadius: 100,
            backgroundColor: Colors.main.primary._500,
            alignItems: "center",
            justifyContent: "center",
            
            
          }}
        >
          <Text style={[Typography.bold.large, { color: Colors.others.white }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
        
        </>
    );
}
const styles = StyleSheet.create({
    itemcontainer: {},
  
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 20,
      alignItems: "center",
      marginTop:10,
      backgroundColor: "transparent",
    },
    container: {
      
      gap: 20,
      alignItems: "flex-start",
      backgroundColor: Colors.grayScale._50,
      flex: 1,
      padding: 20,
    },
  
    headerdark: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 20,
      alignItems: "center",
      backgroundColor: "transparent",
      marginTop:10
    },
    containerdark: {
      gap: 20,
      backgroundColor: Colors.dark._1,
      alignItems: "flex-start",
      flex: 1,
      padding: 20,
    },
  });
  