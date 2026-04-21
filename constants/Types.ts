import { TCountries } from "countries-list";
import React from "react";

export type ThemeType = "light" | "dark" | null;

export interface ModalType {
  visible: boolean;
  show: ({ children }: { children: React.JSX.Element }) => void;
  hide: () => void;
  content: { children: React.JSX.Element | React.JSX.Element[] | null };
}

export interface PaymentOption {
  id: number;
  title: string;
  iconSvgStringLight: string;
  iconSvgStringDark?: string;
}
export interface AuthType {
  patientId: string;
  email: string;
  isLoggedIn: boolean;
  activated: boolean;
  userId: string;
  token: string;
  refreshToken: string;
  name: string;
  imageUrl: string;
  authType: string;

  refreshSession: () => Promise<void>;
  setUpUserInfo: (user: UserInfo) => Promise<void>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signInWithApple: () => Promise<void>;
}

export interface Countries extends TCountries {
  [key: string]: any;
}

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  hospital: string;
  rate: string;
  review: string;
  specialization: string;
  about: string;
}

export interface Appointment {
  id: number;
  created_at: string;
  doctor_id: string;
  date: string;
  time: string;
  package: string;
  price: string;
  illness_descr: string;
  status: string;
  user_id: string;
}

export interface PatientTypes {
  activated: boolean;
  age: number | null;
  auth_id: string;
  country: string | null;
  created_at: string;
  date_of_birth: string;
  email: string | null;
  first_name: string;
  gender: "M" | "F";
  id: string;
  image: string;
  last_name: string;
  phone: string | null;
  updated_at: string | null;
}


export type Gender = "M" | "F";

export interface UserInfo {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string; // or Date if you prefer, but AuthContext sends to Supabase as-is

  image: {
    uri: string;
    mimeType?: string;
  };
}