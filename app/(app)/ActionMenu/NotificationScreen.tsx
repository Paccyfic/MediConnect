import React, { useState,useEffect } from "react";
import { FlatList, View } from "react-native";

import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";
import { useNotifications } from "@/ctx/NotificationsContext";
import NotificationListing from "@/components/UI/NotificationListing";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
interface Notification {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  patientId: string;
  doctorId: string;
  type: 'appointment_changed' | 'appointment_completed' | 'appointment_booked' | 'new_service' | 'payment_setup' | 'account_setup';
  viewed?: boolean;
}

function NotificationScreen() {
  const { theme, changeTheme } = useContext(ThemeContext);
 
  const { notifications, setNotifications } = useNotifications()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      
      const updateViewedStatus = async () => {
        const userNotifications = notifications.filter(notification => !notification.viewed);

        if (userNotifications.length > 0) {
          const ids = userNotifications.map(notification => notification.id);
          const { error } = await supabase
            .from('notifications') 
            .update({ viewed: true })
            .in('id', ids);
          if (!error) {
           
            const updatedNotifications = notifications.map(notification => 
              ids.includes(notification.id) ? { ...notification, viewed: true } : notification
            );
            setNotifications(updatedNotifications);
          }
        }
      };

      updateViewedStatus();
    }, 8000); 

    return () => clearTimeout(timer);
  }, [notifications, setNotifications]);
    
   

    

  return (
    <View
      style={{
        height: "100%",
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._1,
      }}
    >
      <FlatList
        scrollEnabled={true}
        contentContainerStyle={{
          padding: 24,
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
          gap: 15,
        }}
        data={notifications}
        renderItem={({ item: notification }) => (
          <NotificationListing
            createdAt={new Date(notification.createdAt)}
            description={notification.description}
            title={notification.title}
                type={notification.type}
                viewed={notification.viewed}
          />
        )}
        keyExtractor={(item) => item.id.toString()} 
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

export default NotificationScreen;
