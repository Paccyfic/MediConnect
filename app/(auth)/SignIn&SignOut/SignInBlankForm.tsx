import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  AppState,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { router } from "expo-router";
import Typography from "../../../constants/Typography";
import { Colors } from "../../../constants/Colors";
import { ThemeContext } from "@/ctx/ThemeContext";
import { SvgXml } from "react-native-svg";
import {
  BlackApple,
  DarkContinueLine,
  LightContinueLine,
  WhiteApple,
} from "@/components/Icons/Icons";
import Alerts from "@/components/UI/AlertComponent";
import { StatusBar } from "expo-status-bar";
import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useAuth } from "@/ctx/AuthContext";
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri({
  native: "com.medica://",
});

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const signInWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);

    router.push("/(app)/ActionMenu");
  }
};

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Login = () => {
  const { signInWithApple } = useAuth();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setEmailFocused(false);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };


  async function signInWithEmail() {
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      Alert.alert("Error signing in");
      setIsLoading(false);
    }
  }

  const supabaseAuth = supabase.schema('auth');

  const handleSignInWithApple = async () => {
    setLoading(true);
    try {
      await signInWithApple();
      router.push("/(app)/ActionMenu");
    } catch (error) {
      console.error('Error signing in with Apple:', error);
      // Handle error (show alert, reset loading state, etc.)
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <ScrollView
      style={{
        backgroundColor: theme === "dark" ? "#181A20" : "#FFFFFF",
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 48,
        gap: 17,
      }}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View>
        <Image source={require("../../../assets/icons/HeartPlus.png")} />
      </View>

      <View style={styles.midPartOne}>
        <Text
          style={[
            Typography.heading._3,
            { color: theme === "dark" ? "#FFFFFF" : Colors.grayScale._900 },
          ]}
        >
          Login to Your Account
        </Text>
      </View>

      <View style={styles.Buttons}>
        <View
          style={[
            styles.inputOne,
            emailFocused && styles.inputOneFocused,
            {
              backgroundColor:
                theme === "dark" ? "#1F222A" : Colors.grayScale._50,
            },
          ]}
        >
          <Image
            source={require("../../../assets/icons/Message.png")}
            style={[styles.icon, emailFocused && styles.iconFocused]}
          />
          <TextInput
            style={[
              {
                fontSize: 16,
                flex: 1,
                color: theme === "dark" ? Colors.grayScale._50 : "black",
              },
              emailFocused && styles.emailFocused,
            ]}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#9E9E9E"
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
          />
        </View>

        <View
          style={[
            styles.inputOne,
            passwordFocused && styles.inputOneFocused,
            {
              backgroundColor:
                theme === "dark" ? "#1F222A" : Colors.grayScale._50,
            },
          ]}
        >
          <Image
            source={require("../../../assets/icons/Lock.png")}
            style={[styles.icon, passwordFocused && styles.iconFocused]}
          />

          <TextInput
            style={[
              {
                fontSize: 16,
                flex: 1,
                color: theme === "dark" ? Colors.grayScale._50 : "black",
              },
              passwordFocused && styles.emailFocused,
            ]}
            placeholder="Password"
            placeholderTextColor="#9E9E9E"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />
          <View
            style={[
              styles.passwordInputContainer,
              passwordFocused && styles.passwordInputContainerFocused,
            ]}
          >
            <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
              <Ionicons
                name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={passwordFocused ? "#246BFD" : "gray"}
                style={styles.eye}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <View style={styles.Check}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
          color="#007bff"
        />
        <Text
          style={[
            Typography.semiBold.medium,
            { color: theme === "dark" ? "#FFFFFF" : Colors.grayScale._900 },
          ]}
        >
          Remember me
        </Text>
      </View>

      <View>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => signInWithEmail()}
          style={{
            backgroundColor: isLoading
              ? Colors.status.disabled_button
              : Colors.main.primary._500,
            width: 360,
            height: 58,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#246BFD",
            elevation: 10,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push("/(auth)/ForgotPassword&Reset")
        }
      >
        <Text
          style={[
            Typography.semiBold.large,
            { color: Colors.main.primary._500 },
          ]}
        >
          Forgot the password?
        </Text>
      </TouchableOpacity>

      <View>
        <SvgXml xml={theme === "dark" ? DarkContinueLine : LightContinueLine} />
      </View>

      <View style={styles.overCont}>
        <TouchableOpacity onPress={signInWithFacebook}>
          <View
            style={[
              styles.smallCont,
              {
                backgroundColor: theme === "dark" ? "#1F222A" : "#FFFFFF",
                borderColor: theme === "dark" ? "#35383F" : "#EEEEEE",
              },
            ]}
          >
            <Image source={require("../../../assets/icons/facebook.png")} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={[
              styles.smallCont,
              {
                backgroundColor: theme === "dark" ? "#1F222A" : "#FFFFFF",
                borderColor: theme === "dark" ? "#35383F" : "#EEEEEE",
              },
            ]}
          >
            <Image source={require("../../../assets/icons/Google.png")} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={signInWithApple}>
          <View
            style={[
              styles.smallCont,
              {
                backgroundColor: theme === "dark" ? "#1F222A" : "#FFFFFF",
                borderColor: theme === "dark" ? "#35383F" : "#EEEEEE",
              },
            ]}
          >
            <SvgXml xml={theme === "dark" ? WhiteApple : BlackApple} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.account}>
        <Text
          style={[
            Typography.regular.medium,
            { color: theme === "dark" ? "#FFFFFF" : Colors.grayScale._500 },
          ]}
        >
          Don’t have an account?
        </Text>
        <Text
          style={[
            Typography.semiBold.medium,
            { color: Colors.main.primary._500 },
          ]}
          onPress={() => router.push("/(auth)/SignIn&SignOut/SignUpBlankForm")}
        >
          Sign up
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputOneFocused: {
    borderColor: "#246BFD",
    borderWidth: 2,
  },
  emailFocused: {
    color: "#868a94",
    fontSize: 16,
  },
  iconFocused: {
    tintColor: "#246BFD",
  },
  passwordInputContainerFocused: {
    borderColor: "#246BFD",
  },
  icon: {
    tintColor: "#868a94",
  },
  eye: {
    marginRight: 10,
  },
  passwordIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textInputFocused: {
    borderColor: "blue",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#246BFD",
  },
  remember: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.6,
    letterSpacing: 0.2,
  },
  Check: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  smallCont: {
    width: 80,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  overCont: {
    flexDirection: "row",
    gap: 10,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputs1: {
    backgroundColor: "#fff",
    margin: 30,
    marginTop: 30,
    marginBottom: 0,
    padding: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputOne: {
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    width: 360,
    height: 60,
    padding: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
    gap: 10,
  },
  email: {
    fontSize: 16,
    flex: 1,
  },
  signText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textBtn: {
    fontSize: 16,
    fontWeight: "bold",
  },
  middleButton: {
    flexDirection: "row",
    gap: 15,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 380,
    borderRadius: 16,
  },
  Buttons: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textOne: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#212121",
  },
  midPartOne: {
    justifyContent: "center",
    alignItems: "center",
  },
  frogotPass: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    textAlign: "center",
    color: "#246BFD",
  },
  account: {
    flexDirection: "row",
    gap: 5,
  },
  arrow: {
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
  },
  LoginText: {
    color: "#246BFD",
    fontWeight: "600",
  },
});

export default Login;
