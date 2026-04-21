import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import {Colors} from '@/constants/Colors';
import { router } from 'expo-router';
import { LeftArrow } from '@/components/UI/Icons';
import { ThemeContext } from '@/ctx/ThemeContext';
import { supabase } from '@/lib/supabase';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LoadingIcon } from "@/components/UI/Icons";
import Typography from '@/constants/Typography';
import { useModal } from '@/ctx/ModalContext';
import { SvgXml } from 'react-native-svg';
import { changePasswordModalImage } from '@/constants/icon';
import Alerts from '@/components/UI/AlertComponent';

export default function CreateNewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ text: string, status: "success" | "error" | "info" | "warning" } | null>(null);

  const modal = useModal();

  const {theme, changeTheme} = useContext(ThemeContext)

  const rotationValue = useSharedValue(0);

  useEffect(() => {
    rotationValue.value = withRepeat(withTiming(1, { duration: 2000 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationValue.value * 360}deg` }],
  }));

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function handleModal() {
    modal.show({
      children: (
        <View
          style={{
            padding: 40,
            alignItems: "center",
            gap: 20,
            borderRadius: 48,
            backgroundColor:
              theme === "light"
                ? Colors.others.white
                : Colors.dark._1,
          }}
        >
         <SvgXml xml={changePasswordModalImage}/>
          <View
            style={{
              gap: 20,
              backgroundColor:
                theme === "light"
                  ? Colors.others.white
                  : Colors.dark._1,
            }}
          >
            <Text
              style={[
                Typography.heading._4,
                {
                  color: Colors.main.primary._500,
                  textAlign: "center",
                },
              ]}
            >
              Congratulations!
            </Text>
            <Text
              style={[
                Typography.regular.large,
                {
                  textAlign: "center",
                  color:
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white,
                },
              ]}
            >
              Your account is ready to use. You will be redirected to the Home page in a few seconds..
            </Text>
          </View>
          <Animated.View style={[animatedStyle]}>
            <LoadingIcon
              fillColor={Colors.main.primary._500}
            />
          </Animated.View>
        </View>
      ),
    });
    setTimeout(() => {
      modal.hide();
      router.push("(auth)/SignIn&SignOut/SignInBlankForm");
    }, 3000)
  }

  const handleCreatePassword = async() => {
    try {
      setIsLoading(false);
      if(!newPassword || !confirmPassword){
        setAlert({ text: "Fill all the fields", status: "error" });
      }
     if(newPassword !== confirmPassword){
      setAlert({ text: "Password doesn't match", status: "error" });
      return
     }

    const {error}  = await supabase.auth.updateUser({password: newPassword})
    if(error){
      setAlert({ text: "Make sure the user is registered", status: "error" });
      setIsLoading(false);

    }else{
      setIsLoading(true);
      handleModal()
    }
    } catch (error) {
      setAlert({ text: "Error updating password", status: "error" });
      setIsLoading(false);

    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
       <Pressable onPress={() => router.back()} style={{
          paddingTop: 100,
          flexDirection: "row",
          alignItems: "center",
          gap: 30,
          padding:30,
          backgroundColor:"white",
            }}>
          <MaterialIcons name="arrow-back" size={25} style={{alignSelf: "center",
        }} />
          <Text style={{ 
            fontSize: 24,
            fontWeight: "600",}}
            >Create new password</Text>
        </Pressable>
        {/* </View> */}
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={require('../../assets/images/create.png')} />
        </View>

        <Text style={styles.description}>Create new password</Text>

        <View style={styles.inputText}>
          <View style={styles.inputContainer}>
            <FontAwesome name={'lock'} size={24} color="black" style={styles.togglelock} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.toggleButton}>
              <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name={'lock'} size={24} color="black" style={styles.togglelock} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.toggleButton}>
              <FontAwesome name={showConfirmPassword ? 'eye-slash' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          {alert && <Alerts text={alert.text} status={alert.status} />}


          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
              {rememberMe && <FontAwesome name="check-square" size={24} color="#236bfd" />}
              {!rememberMe && <FontAwesome name="square-o" size={24} color="#236bfd" />}
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={()=> {
            handleCreatePassword()
          }} style={styles.createButton}>
            
            {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.createButtonText}>Continue</Text>
          )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 70,
  },
  description: {
    paddingLeft: 25,
    paddingTop: 20,
    fontFamily: 'Regular',
    fontSize: 17,
  },
  image: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: '#EEEEEE',
    padding: 12,
    paddingLeft: 40, 
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  togglelock: {
    position: 'absolute',
    left: 10, 
    zIndex: 1, 
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#236bfd',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: '100%',
    alignSelf: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  inputText: {
    padding: 20,
  },
});
