// DoctorCard.tsx
import {Colors} from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { ThemeContext } from '@/ctx/ThemeContext';
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface DoctorCardProps {
  name: string;
  date: string;
  time: string;
  image: any;
  status: string;
  statusColor: string;
  type: string;
  icon: any;
  iconOnPress: ()=> void
  buttons?: any;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, date, time, image, status, statusColor, type, icon, buttons, iconOnPress}) => {
    const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <ImageBackground style={[styles.card,{backgroundColor: theme === "dark" ? Colors.dark._2 : "#f5f5f5"}]}>
      <View style={styles.upperSection}>
        <Image style={styles.cardImage} source={image}/>
        <ImageBackground>
          <View style={styles.cardHeader}>
            <Text style={[styles.docName, {color: theme==="dark"?  Colors.others.white: Colors.others.black}]}>{name}</Text>
          </View>
          <View style={styles.docStatus}>
            <Text style={[Typography.medium.small,{ color: theme === "dark"? Colors.grayScale._200 : Colors.grayScale._800 }]}>{type} - </Text>
            <View style={[styles.statusContainer, { borderColor: statusColor,backgroundColor: "transparent" }]}>
              <Text style={[Typography.medium.small,{ color: statusColor}]}>{status}</Text>
            </View>
            <TouchableOpacity 
            onPress={icon === null ? ()=> {} : iconOnPress}
            style={{padding: 20, backgroundColor: icon === null && theme === "light"? "#f5f5f5" :Colors.transparent.blue, borderRadius: 100, marginLeft: 10}}
            >
            {icon}
            </TouchableOpacity>
          </View>
          <Text style={[Typography.medium.small,{ color: theme === "dark"? "#D3D3D3" : '#424242', marginLeft: 10}]}>{date} | {time}</Text>
        </ImageBackground>
      </View>
      
      
        <View style={styles.CardButtons}>
          {buttons}
        </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 200,
    marginTop: 20,
    marginLeft: '2%',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'column'
  },
  cardImage: {
    height: 110,
    width: '30%',
    borderRadius: 20,
  },
  upperSection: {
    flexDirection: 'row'
  },
  cardHeader: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  docName: {
    marginLeft: 15,
    marginRight: '18%',
    marginTop: '1%',
    fontSize: 20,
    padding: 0,
  },
  docStatus: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '0%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusContainer: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    marginRight:10
  },
  
  CardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 5,
    borderColor: '#246BFD',
    borderWidth: 2,
    borderRadius: 20,
    width: 150,
    height: 34,
    alignItems: 'center',
    justifyContent: "center",
    marginLeft: 10
  },
  primaryButton: {
    backgroundColor: "#246BFD",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    width: 150,
    height: 34,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: '#246BFD'
  },
  primaryButtonText: {
    color: "white"
  }
});

export default DoctorCard;
