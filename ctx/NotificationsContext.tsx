import { supabase } from "@/lib/supabase";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface NotificationsType {
  notifications: NotificationType[];
  getNotifications: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  createNotification: (notificaction: NotificationType) => Promise<void>;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
}

export interface NotificationType {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  patientId: string;
  doctorId: string;
  viewed: boolean;
  type:
    | "appointment_changed"
    | "appointment_completed"
    | "appointment_booked"
    | "new_service"
    | "payment_setup"
    | "account_setup";
}

export const NotificationsContext = createContext<NotificationsType>({
  notifications: [],
  getNotifications: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteNotification: async (id: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createNotification: async (notification: NotificationType) => {},
  setNotifications: () => {},
});

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export default function NotificationsProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { isLoggedIn, activated, patientId } = useAuth();

  async function getNotifications() {}

  async function deleteNotification(id: string) {
    console.log(id);
  }

  async function createNotification(notification: NotificationType) {
    console.log(notification);
  }

  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: false });

        if (error) error;

        const notifs = data!.map((notification) => {
          return {
            id: notification.id,
            createdAt: notification.created_at,
            title: notification.title,
            description: notification.description,
            patientId: notification.patient_id,
            viewed: notification.viewed,
            doctorId: notification.doctor_id,
            type: notification.type,
          };
        });

        setNotifications(notifs || []);
      } catch (err) {
        Alert.alert((err as Error).message);
      }
    };

    if (isLoggedIn && activated) {
      fetchInitialNotifications();
      const channel = supabase
        .channel("notifications")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public" },
          (payload) => {
            const newNotification = payload.new;

            if (newNotification.patient_id === patientId) {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: newNotification.title,
                  body: newNotification.description,
                },
                trigger: null,
              });

              setNotifications((prevNotifications) => {
                const updatedNotifications = [
                  {
                    id: newNotification.id,
                    createdAt: newNotification.created_at,
                    title: newNotification.title,
                    description: newNotification.description,
                    patientId: newNotification.patient_id,
                    viewed: newNotification.viewed,
                    doctorId: newNotification.doctor_id,
                    type: newNotification.type,
                  },
                  ...prevNotifications,
                ];

                return updatedNotifications;
              });
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isLoggedIn, activated]);

  const value = {
    notifications,
    getNotifications,
    setNotifications,
    deleteNotification,
    createNotification,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext);
