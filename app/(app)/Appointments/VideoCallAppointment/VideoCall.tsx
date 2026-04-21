import React, { useContext, useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
 
} from "@videosdk.live/react-native-sdk";
import { Colors } from "@/constants/Colors";
import { createMeeting, token } from "@/lib/api";
import Typography from "@/constants/Typography";
import { SvgXml } from "react-native-svg";
import {hungup, Record,MicOff, BackArrow, blackArrow, CameraOff,CameraOn , TurnCamera } from "@/components/Icons/Icons";
import { router, useGlobalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/ctx/AuthContext";
import { fetchPatientData, getUserImageUrl } from "@/utils/LoggedInUser";
import { ThemeContext } from "@/ctx/ThemeContext";
import ToggleCamera from "@/assets/icons/ToggleCamera";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface JoinScreenProps {
  getMeetingId: (id?: string) => void;
}

const JoinScreen: React.FC<JoinScreenProps> = ({ getMeetingId }) => {
  const [meetingVal, setMeetingVal] = useState("");
  const [meetingFocused, setMeetingFocused] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const { userId } = useContext(AuthContext);
  const {theme, changeTheme} = useContext(ThemeContext);

  const handleEmailFocus = () => {
    setMeetingFocused(true);
  };

  const handleEmailBlur = () => {
    setMeetingFocused(false);
  };

  useEffect(() => {
    if (userId ) {
      fetchPatientData(userId , setPatientData);
      getUserImageUrl("patients", userId , setImageUrl);
    }
  }, [userId]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 50,
        gap: 100,
        backgroundColor: theme === "dark" ? "#181A20" : "white" 

      }}
    >
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => router.back()}>
          <SvgXml xml={theme === 'dark' ? BackArrow : blackArrow} />
        </TouchableOpacity>
      </View>

      <View style={{justifyContent:'center',alignItems:'center', gap: 30}}>
        <Image source={require("@/assets/icons/HeartPlus.png")} />
      

      <TouchableOpacity
        onPress={() => {
          getMeetingId();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 380,
          height: 58,
          backgroundColor: "#246BFD",
          borderRadius: 100,
        }}
      >
        <Text style={[Typography.bold.large, { color: "#ffffff" }]}>
          Create Meeting
        </Text>
      </TouchableOpacity>

      <Text style={[Typography.bold.large, { color: "#757575" }]}>OR</Text>

      <View style={[meetingFocused && styles.inputOneFocused,{ backgroundColor:
                theme === "dark" ? "#181A20" : '#FAFAFA',width: 380,borderRadius: 100}]}>
        <TextInput
          value={meetingVal}
          onChangeText={setMeetingVal}
          placeholder={"XXXX-XXXX-XXXX"}
          style={[styles.input, meetingFocused && styles.meetingFocused]}
          placeholderTextColor="#9E9E9E"
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
        />
      </View>

      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 380,
          height: 58,
          backgroundColor: "#246BFD",
          borderRadius: 100,
        }}
        onPress={() => {
          getMeetingId(meetingVal);
        }}
      >
        <Text style={[Typography.bold.large, { color: "#ffffff" }]}>
          Join Meeting
        </Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputOneFocused: {
    borderColor: "#246BFD",
    borderWidth: 2,
    borderRadius: 100,
    width: 380,
  },
  meetingFocused: {
    color: "#868a94",
    fontSize: 16,
  },
  input: {
    padding: 12,
    borderWidth: 0,
    borderRadius: 6,
    alignSelf: "center",
    fontFamily: "italic",
  },
  Background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 48,
    paddingLeft: 24,
    paddingRight: 24,
  },
  backArrow: {
    alignSelf: "flex-start",
  },
});

interface ButtonProps {
  onPress: () => void;
  buttonText: string;
  backgroundColor: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  buttonText,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 4,
      }}
    >
      <Text style={{ color: "white", fontSize: 12 }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

interface ControlsContainerProps {
  join: () => void;
  leave: () => void;
  toggleMic: () => void;
  toggleWebcam: () => void;
}

const ControlsContainer: React.FC<ControlsContainerProps> = ({
  join,
  leave,
  toggleMic,
  toggleWebcam,
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const { id, AppointmentID } = useGlobalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);

  const cameraRef = useRef("environment");


  const HandleUpdate = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("appointment")
        .update({ status: "Completed" })
        .eq("id", AppointmentID);
      if (error) {
        console.log(error);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleMicPress = () => {
    setIsMicOn((prevState) => !prevState);
  }
  const handleCameraPress = () => {
    setIsCameraOn((prevState) => !prevState);
  }


  const handleButtonDisable = () => {
    setButtonDisabled(true);
  };
  return (
    <View
      style={{
        padding: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: theme === "light" ? "#02b11a": Colors.others.white,
          borderRadius: 100,
          padding: 23,
          opacity: 0.6,
        }}
        onPress={() => {
          join();
          handleButtonDisable();
        }}
        disabled={isButtonDisabled}
      >
        <Text style={[Typography.bold.large, { color: theme === "light" ? Colors.others.white: Colors.others.white, }]}>Join</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor:  "#3f3f3f",
          borderRadius: 100,
          padding: 23,
          opacity: 0.6,
        }}
        onPress={() => {
          toggleMic();
          handleMicPress();
        }}
      >
        <SvgXml xml={isMicOn ? Record : MicOff} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#3f3f3f",
          borderRadius: 100,
          padding: 23,
          opacity: 0.6,
        }}
        onPress={() => {
          toggleWebcam();
          handleCameraPress();
        }}
      >
        <SvgXml xml={isCameraOn ? CameraOn : CameraOff} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "#F75555", borderRadius: 100, padding: 20 }}
        onPress={() => {
          leave();
          HandleUpdate();
          router.push({
            pathname: "(app)/Appointments/VideoCallAppointment/VideoCallSessionEnded",
            params: { id: id },
          });
        }}
      >
        <SvgXml xml={hungup} />
      </TouchableOpacity>
      
    </View>
  );
};

interface ParticipantViewProps {
  participantId: string;
  meetingId: string | null;
}

interface Doctors {
  first_name: string;
  last_name: string;
  created_at: string;
  image: string;
  id: string;
}

type FetchDoctor = Doctors | null;
type FetchError = string | null;

const tableName = "doctors";

const ParticipantView: React.FC<ParticipantViewProps> = ({ participantId }) => {
  const [fetchDoctor, setFetchDoctor] = useState<FetchDoctor>(null);
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const { webcamStream, webcamOn } = useParticipant(participantId);
  const { id } = useGlobalSearchParams();
  useEffect(() => {
    const FetchDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .eq("id", `${id}`)
          .single();

        if (data) {
          setFetchDoctor(data);
          setFetchError(null);
        }

        if (error) {
          setFetchDoctor(null);
          setFetchError("could not fetch doctor's details in database");
          return null;
        }
      } catch (error) {
        console.error(error);
        setFetchError("An unexpected error occurred");
        return null;
      }
    };
    FetchDoctors();
  }, []);

  return webcamOn && webcamStream ? (
    <>
      <RTCView
        streamURL={new MediaStream([webcamStream?.track]).toURL()}
        objectFit={"cover"}
        style={{
          height: 300,
          backgroundColor:"black",
          marginVertical: 8,
          marginHorizontal: 8,
        }}
      />
    </>
  ) : (
    <View
      style={{
        backgroundColor: "grey",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 8,
      }}
    >
      <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
    </View>
  );
}

interface ParticipantListProps {
  participants: string[];
  meetingId: string | null;

}

interface Doctors {
  first_name: string;
  last_name: string;
  created_at: string;
  image: string;
  id: string;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants,meetingId  }) => {
  const [fetchDoctor, setFetchDoctor] = useState<FetchDoctor>(null);
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const {theme, changeTheme} = useContext(ThemeContext);

  const { id } = useGlobalSearchParams();
  useEffect(() => {
    const FetchDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .eq("id", `${id}`)
          .single();

        if (data) {
          setFetchDoctor(data);
          setFetchError(null);
        }

        if (error) {
          setFetchDoctor(null);
          setFetchError("could not fetch description articles in database");
          console.error("Error fetching item:", error);
          return null;
        }
      } catch (error) {
        console.error(error);
        setFetchError("An unexpected error occurred");
        return null;
      }
    };
    FetchDoctors();
  }, []);


  return participants.length > 0 ? (
    <FlatList
      data={participants}
      renderItem={({ item }) => {
        return <ParticipantView participantId={item} meetingId={meetingId}/>;
      }}
      keyExtractor={(item) => item}
    />
  ) : (
    <View
      style={{
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fetchError && <Text>{fetchError}</Text>}

      {fetchDoctor && (
        <View style={{ justifyContent: "center", alignItems: "center", gap: 24, paddingTop: 50,}}>
          <Image
            source={{ uri: fetchDoctor.image }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
          <Text style={[Typography.heading._3, { color: theme === "dark" ? "white" : "black" }]}>
            {fetchDoctor.first_name} {fetchDoctor.last_name}
          </Text>
          <Text style={[Typography.medium.xLarge, { color: theme === "dark" ? "white" : "black" }]}>
            Tap to join
          </Text>
        </View>
      )}
    </View>
  );
};

const MeetingView: React.FC<{ meetingId: string | null }> = ({ meetingId }) => {
  const { join, leave, toggleMic, toggleWebcam ,participants } = useMeeting({});
  const participantsArrId = [...participants.keys()];
  const {theme, changeTheme} = useContext(ThemeContext);

  return (
    
      <View style={{backgroundColor: theme === "dark" ? "#000000" : "white" , flex: 1, justifyContent: 'space-between', paddingTop:50 }}>
        <ParticipantList participants={participantsArrId} meetingId={meetingId}/>
        <ControlsContainer join={join} leave={leave} toggleMic={toggleMic} toggleWebcam={toggleWebcam}/>
      </View>
  );
};


const VideoCallRinging: React.FC = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const { AppointmentID } = useGlobalSearchParams();

  const getMeetingId = async (id?: string) => {
    const newMeetingId = id == null ? await createMeeting({ token }) : id;
    setMeetingId(newMeetingId);
    if (newMeetingId) {
      try {
        const { error } = await supabase
          .from("appointment")
          .update({ meetingId: newMeetingId })
          .eq("id", AppointmentID);
        if (error) {
          console.error("Error updating meeting ID:", error);
        }
      } catch (error) {
        console.error("Unexpected error updating meeting ID:", error);
      }
    }
  };

  return meetingId ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "Patient",
        }}
        token={token}
      >
        <MeetingView meetingId={meetingId}/>
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId} />
  );
};

export default VideoCallRinging;