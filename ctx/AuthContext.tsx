import React, { useContext, useEffect } from "react";
import { AuthType, UserInfo } from "@/constants/Types";
import { createContext, useState } from "react";
import { supabase } from "@/lib/supabase";
import uuid from "react-native-uuid";
import * as AppleAuthentication from "expo-apple-authentication";

export const AuthContext = createContext<AuthType>({
  email: "",
  isLoggedIn: false,
  activated: false,
  userId: "",
  token: "",
  refreshToken: "",
  name: "",
  imageUrl: "",
  patientId: "",
  authType: "",
  setUpUserInfo: async (user: UserInfo) => {},
  refreshSession: async () => {},
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string) => {},
  logout: async () => {},
  signInWithApple: async () => {},
});

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export default function AuthProvider({ children }: Props) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [activated, setActivated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [authType, setAuthType] = useState("");
  const [patientId, setPatientId] = useState("");

  async function refreshSession() {}

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUserId("");
      setEmail("");
      setActivated(false);
      setIsLoggedIn(false);
      setToken("");
      setRefreshToken("");
      setName("");
      setImageUrl("");
      setAuthType("");
      setPatientId("");
    } else {
      console.error("Error logging out:", error.message);
    }
  }

  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data: patientData, error: patientError } = await supabase
      .from("patients")
      .select("*")
      .eq("auth_id", data.session?.user.id);

    console.log(patientData);

    if (!error) {
      setIsLoggedIn(true);
      setEmail(data.session.user.email!);
      setToken(data.session.access_token);
      setRefreshToken(data.session.refresh_token);
      setUserId(data.session.user.id);
      setPatientId(patientData![0].id);
    } else {
      throw new Error(error.message);
    }
  }

  async function register(email: string, password: string) {
    const { data: registerData, error: registerError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (registerError) throw new Error(registerError.message);
    
    const newUserId = registerData.user?.id;
    if (!newUserId) throw new Error("Sign up succeeded but no user id was returned.");
    
    const { error: patientInsertError } = await supabase
      .from("patients")
      .insert({ auth_id: newUserId, activated: false });
    
    if (patientInsertError) throw new Error(patientInsertError.message);
    
    // If email confirmation is ON, session can be null here.
    setEmail(email);
    setUserId(newUserId);
    
    if (registerData.session) {
      setToken(registerData.session.access_token);
      setRefreshToken(registerData.session.refresh_token);
    }
  }

  async function setUpUserInfo(user: UserInfo) {
    if (!userId)
      throw Error(
        "Something happened,please try closing and reopening the app"
      );

    const imageName = userId + "/" + uuid.v4();
    
    if (!authType || authType === "apple") {
      const res = await fetch(user.image.uri);
      const arrayBuffer = await res.arrayBuffer();

      console.log("imageRes", res);

      const res1 = await supabase.storage
        .from("patients")
        .upload(imageName, arrayBuffer, {
          contentType: user.image.mimeType ?? "image/jpeg",
        });

      console.log("Res1: ", res1);
    }

    const res = await supabase
      .from("patients")
      .update({
        first_name: user.firstName,
        last_name: user.lastName,
        gender: user.gender,
        date_of_birth: user.birthDate,
        activated: true,
        image: authType && authType !== "apple" ? imageUrl : imageName,
      })
      .eq("auth_id", userId);

    const { data: patientData, error: patientError } = await supabase
      .from("patients")
      .select("*")
      .eq("auth_id", userId);

    setPatientId(patientData![0].id);
    setActivated(true);
    setIsLoggedIn(true);
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const response = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });

        if (response.error) {
          console.error("Error signing in with Apple:", response.error);
          throw new Error("Error signing in with Apple");
        } else {
          console.log("User signed in:", response.data.user);

          const userId = response.data.user.id;
          const email = response.data.user.email;

          const { data: existingUser, error: checkError } = await supabase
            .from("patients")
            .select("auth_id")
            .eq("auth_id", userId)
            .single();

          if (checkError && checkError.code !== "PGRST116") {
            console.log("Error checking existing user: ", checkError);
            throw new Error(checkError.message);
          }

          if (!existingUser) {
            const { error } = await supabase
              .from("patients")
              .insert({ auth_id: userId, activated: false });

            if (error) {
              console.log("Error creating patient entry: ", error);
              throw new Error(error.message);
            }
          }
          setToken(response.data.session?.access_token || "");
          setRefreshToken(response.data.session?.refresh_token || "");
          setEmail(email ?? "");
 setUserId(userId);
          setIsLoggedIn(true);
          setAuthType("apple");
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      console.error("Error during Apple sign-in:", e);
      throw e;
    }
  }

  useEffect(() => {
    (async () => {
      if (userId) {
        const { data } = await supabase
          .from("patients")
          .select(`*`)
          .eq("auth_id", userId)
          .single();

        console.log("Activated?: " + data?.activated);

        setActivated(data?.activated);
        setIsLoggedIn(true);
      }
    })();
  }, [userId]);

  const value = {
    isLoggedIn,
    token,
    refreshToken,
    activated,
    userId,
    email,
    name,
    authType,
    imageUrl,
    patientId,
    setPatientId,
    setName,
    setUpUserInfo,
    refreshSession,
    login,
    logout,
    register,
    setIsLoggedIn,
    setEmail,
    setToken,
    setRefreshToken,
    setUserId,
    setImageUrl,
    setAuthType,
    signInWithApple,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
