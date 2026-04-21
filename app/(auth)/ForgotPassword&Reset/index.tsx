import React, { useContext, useEffect } from "react";
import { Text } from "@/components/Themed";
import { LeftArrow, Chat, Message } from "@/components/UI/Icons";
import { StyleSheet, Image, View, TouchableOpacity, Pressable, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Typography from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Redirect, router } from "expo-router";
import { supabase } from "@/lib/supabase";
import Alerts from "@/components/UI/AlertComponent";
import { ThemeContext } from "@/ctx/ThemeContext";




export default function ForgotPassword() {
  const image = require("@/assets/images/ForgotPasswordImages/forgotpassword.png");
  const darkImg = require("@/assets/images/ForgotPasswordImages/forgotpassworddark.png");
  const [isSelectedSMS, setIsSelectedSMS] = useState(true);
  const [isSelectedEmail, setIsSelectedEmail] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState("")
  const [isLoading , setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ text: string, status: "success" | "error" | "info" | "warning" } | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSelectionSMS = () => {
    setIsSelectedSMS(true);
    setIsSelectedEmail(false);
  };

  const handleSelectionEmail = () => {
    setIsSelectedSMS(false);
    setIsSelectedEmail(true);
  };

  const resetByEmail= async()=> {
    try {
      setIsLoading(false);
      if(!email ){
        setAlert({ text: "Email can't be empty", status: "error" });
      }else if (!validateEmail(email)){
        setAlert({ text: "Enter a valid email", status: "error" });
      }else {
        const {error } = await supabase.auth.resetPasswordForEmail(email)
      if (error){
        setIsLoading(false)
        setAlert({ text: `${error?.message}`, status: "error" });
      }
      setTimeout(()=>{
      router.replace({
        pathname: "(auth)/ForgotPassword&Reset/[OTPform]}",
        params: {email}
      })
      },1000)
      setIsLoading(true);
      setAlert({ text: "Please check your email", status: "success" });
      }
    } catch (error) {
      setAlert({ text: "An unexpected error occurred", status: "error" });
      setIsLoading(false);
    }
  }

  const border= theme=== "dark" ? Colors.dark._3:Colors.grayScale._200;
  
  return (
    <>
      <View
      style={{
        justifyContent: "flex-start",
        gap: 25,
        alignItems: "center",
        flex: 1,
        padding: 20,
        backgroundColor: theme=== "dark" ? Colors.dark._1 : Colors.others.white,
      }}
      >
        
        <View style={theme=== "dark" ? styles.headerdark : styles.header}>
          <Pressable onPress={()=> router.back()}>
            <LeftArrow
              fillColor={theme=== "dark" ? Colors.others.white : Colors.grayScale._900}
            />
          </Pressable>
          <Text
            style={[
              Typography.heading._4,
              { color: theme=== "dark" ? Colors.others.white : Colors.grayScale._900 },
            ]}
          >
            Forgot Password
          </Text>
        </View>
        <View style={{ backgroundColor: "transparent"}}>
          <Image source={theme=== "dark" ? darkImg : image} style={{width:276,height:250}}></Image>
        </View>
        <Text
          style={[
            Typography.regular.xLarge,
            { color:theme=== "dark"  ? Colors.others.white : Colors.grayScale._900 },
          ]}
        >
          Select which contact details should we use to reset your password
        </Text>
        <TouchableOpacity
          onPress={()=> {
            handleSelectionSMS();
          }}
          style={{
            width: 380,
            height: 128,
            borderColor: isSelectedSMS
              ? Colors.main.primary._500
              : border,

            backgroundColor: theme=== "dark" ? Colors.dark._1 : Colors.others.white,
            borderWidth: 3,
            borderRadius: 32,
            flexDirection: "row",
            padding: 24,
            gap: 20,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              backgroundColor:theme === "dark" ? "#181A20" : "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chat fillColor={Colors.main.primary._500} />
          </View>
          <View
            style={{
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Text
              style={[
                Typography.medium.medium,
                {
                  color: theme=== "dark"  ? Colors.grayScale._300 : Colors.grayScale._600,
                },
              ]}
            >
              via SMS
            </Text>
            <Text
              style={[
                Typography.bold.large,
                { color: theme=== "dark"  ? Colors.others.white : Colors.grayScale._900 },
              ]}
            >
              +250********59
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> {
            handleSelectionEmail()
          }}
          style={{
            width: 380,
            height: 128,
            borderColor: isSelectedEmail
              ? Colors.main.primary._500
              : border,
            backgroundColor: theme=== "dark"  ? Colors.dark._1 : Colors.others.white,
            borderWidth: 3,
            borderRadius: 32,
            flexDirection: "row",
            padding: 24,
            gap: 20,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              backgroundColor: Colors.transparent.blue,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Message fillColor={Colors.main.primary._500} />
          </View>
          <View
            style={{
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Text
              style={[
                Typography.medium.medium,
                {
                  color: theme=== "dark"  ? Colors.grayScale._300 : Colors.grayScale._600,
                },
              ]}
            >
              via Email:
            </Text>
              <TextInput
              style={[
                Typography.bold.large,
              
                { color: theme=== "dark"  ? Colors.others.white : Colors.grayScale._900, borderRadius: 5, borderWidth: 1,  borderColor: "#ccc",minWidth: "75%", paddingStart:10}]}
              placeholder="email"
              placeholderTextColor={theme=== "dark"  ? Colors.others.white : Colors.grayScale._500}

              value={email}
              onChangeText={(email)=> setEmail(email)}
            />
          </View>
        </TouchableOpacity>

        {alert && <Alerts text={alert.text} status={alert.status} />}

        <TouchableOpacity
          onPress={()=> {
              resetByEmail()
          }}
          style={{
            width: 380,
            height: 58,
            borderRadius: 100,
            backgroundColor: Colors.main.primary._500,
            alignItems:'center',
            justifyContent:'center',            
          }}
        >
           
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={[Typography.bold.large,{color:Colors.others.white}]}>Continue</Text>

          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    marginTop: 60,
    backgroundColor: "transparent",
  },

  headerdark: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    marginTop: 60,
    backgroundColor: "transparent",
  },

});
