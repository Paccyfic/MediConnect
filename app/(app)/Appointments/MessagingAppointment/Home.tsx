import React from "react";
import { AuthContext } from "@/ctx/AuthContext";
import { useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { fetchPatientData } from "@/utils/LoggedInUser";
import  {PatientTypes} from "@/constants/Types";
import { useAppContext } from "@/ctx/ChatContext";
import ChannelLists from "./ChannelList";
import uuid from "react-native-uuid";
import {useGlobalSearchParams } from "expo-router";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const SECRETE_KEY = process.env.EXPO_PUBLIC_STREAM_API_SECRET;

export function Home() {
    const [clientIsReady, setClientIsReady] = useState<boolean>(false);
    const [patientData, setPatientData] = useState<PatientTypes[] | null>(null);
    const [client, setClient] = useState<StreamChat | null>(null);
    const { channel, setChannel } = useAppContext();


    const { userId } = useContext(AuthContext);

    const chatRoomId = "matadores-medica"+uuid.v4();

    const [loggedInUserId , setLoggedInUserId] = useState<string>("");
    const CDNURL =
      "https://vbwbfflzxuhktdvpbspd.supabase.co/storage/v1/object/public/patients/";
    const { doctorId, appointmentId } = useGlobalSearchParams();

    useEffect(() => {
        if (userId) {
            fetchPatientData(userId, setPatientData);
        }
    }, [userId]);

    const chatClient = StreamChat.getInstance(`${API_KEY}`);

  useEffect(() => {
    const setupClient = async () => {
      try {
        if (patientData && patientData[0]) {
          setLoggedInUserId(patientData[0].id);
          const user = {
            id: patientData[0].id,
            name: `${patientData[0].first_name} ${patientData[0].last_name}`,
            image: `${CDNURL + patientData[0]?.image}`,
          };
          await chatClient.connectUser(user, chatClient.devToken(user.id));

          setClientIsReady(true);
          setClient(chatClient);
          const channel = chatClient.channel("messaging", `${chatRoomId}`, {
            image:
              "https://vbwbfflzxuhktdvpbspd.supabase.co/storage/v1/object/public/doctors/adaptive_icon.png",
            name: `${user?.name} in the chat`,
            members: [user?.id, `${doctorId}`],
          });
          await channel.watch();
          setChannel(channel);
        } else {
          console.log("No patient data found");
        }
      } catch (error) {
        console.error("An error occurred while connecting the user:", error);
      }
    };
    if (!chatClient.userID) {
      setupClient();
    }
    // if(client){return async()=> await client.disconnectUser()}
  }, [patientData]);

  return <ChannelLists appointmentId={appointmentId} loggedInUserId={loggedInUserId} doctorId={doctorId}/>
}

export default Home;