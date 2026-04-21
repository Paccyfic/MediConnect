import React, { useContext, useEffect, useState } from 'react'
import { fetchPatientData } from '@/utils/LoggedInUser';
import { AuthContext } from '@/ctx/AuthContext';
import {
  ChannelList,
  DefaultStreamChatGenerics
} from 'stream-chat-expo'
import { useAppContext } from '@/ctx/ChatContext';
import { PatientTypes } from '@/constants/Types';
import {useRouter } from 'expo-router';
import { ChannelSort } from 'stream-chat';
const ChannelLists = ({appointmentId, loggedInUserId, doctorId}:{appointmentId:any, loggedInUserId:string, doctorId:any}) => {
    const { channel, setChannel } = useAppContext();
    const [patientData, setPatientData] = useState<PatientTypes[] | null>(null);
    const { userId, } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (userId) {
          fetchPatientData(userId, setPatientData);
        }
    }, [userId]);
    let filters = {}
    if (patientData && patientData[0]) {
      filters = {
        members: {
          '$in': [`${patientData[0]?.id}`],
        },
      };
    }

    const sort : ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 }
    const handleNavigateToChannel = (channel: any) => {
      setChannel(channel);
      router.push({
        pathname: "(app)/Appointments/MessagingAppointment/ChannelScreen",
        params: { chanelId: channel?.id, appointmentId, loggedInUserId, doctorId},
            });
    };

  return (

    <ChannelList
      onSelect={(channel) => handleNavigateToChannel(channel)}
      filters={filters}
      sort={sort} 
    />
  
  )
}


export default ChannelLists