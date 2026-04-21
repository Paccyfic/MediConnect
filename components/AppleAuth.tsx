import { Platform, Alert, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../lib/supabase';
import React, { useContext,useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { router } from 'expo-router';
import { ThemeContext } from '@/ctx/ThemeContext';
import { BlackApple, WhiteApple } from '@/components/Icons/Icons';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useAuth } from "@/ctx/AuthContext";

export function Auth() {
  const { theme } = useContext(ThemeContext);
  
  WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri({
  native: "com.medica://",
});
console.log({ redirectTo });

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
  console.log("session", data.session);
  return data.session;
};
const [loading, setLoading] = useState(false)
const { signInWithApple } = useAuth();

const handleSignInWithApple = async () => {
  setLoading(true);
  try {
    await signInWithApple();
    // Navigate to next screen upon successful sign-in if needed
    router.push("/(app)/ActionMenu");
  } catch (error) {
    console.error('Error signing in with Apple:', error);
    // Handle error (show alert, reset loading state, etc.)
  } finally {
    setLoading(false);
  }
};

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={signInWithApple}>
        <View
          style={[
            styles.smallCont,
            { backgroundColor: theme === 'dark' ? '#1F222A' : '#FFFFFF', borderColor: theme === 'dark' ? '#35383F' : '#EEEEEE' },
          ]}
        >
          <SvgXml xml={theme === 'dark' ? WhiteApple : BlackApple} />
        </View>
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  smallCont: {
    width: 80,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
