import { StyleSheet, Text, View, Image,TextInput, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'
import { ThemeContext } from '@/ctx/ThemeContext'
import { LeftBlackArrow } from '@/assets/icons/LeftBlackArrow'
import { SvgXml } from 'react-native-svg'
import Typography  from '@/constants/Typography'
import StarRating from 'react-native-star-rating-widget'
import { HorizontalLine } from '@/assets/icons/HorizantalLine'
import { StatusBar } from 'expo-status-bar'
import { color } from 'react-native-elements/dist/helpers'

interface RadioButtonProps {
  label: string;
  onChange: Function;
  buttonStyle?: any;
  activeButton: string;
  labelStyle?: any;
  radioSize?: number;
}

const RadioText: RadioButtonProps[] = [
  {
    label: "Yes" | "No",
  }
]

const ReviewBlankform: React.FC<RadioButtonProps> = (props) => {
  const{ theme, changeTheme } = useContext(ThemeContext);
const [rating, setRating ] = useState(0);

  return (
    <View style={[styles.container, {backgroundColor: theme === 'dark' ? 'black' : 'white'}]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'}/> 
      <View style={{flexDirection: 'row',gap: 16, alignSelf: 'flex-start' }}>
        <SvgXml xml={LeftBlackArrow} />
        <Text style={[Typography.heading._4, {color: theme === 'dark' ? '#FFFFFF' : '#212121'}]}>Write a Review</Text>
      </View>

    <View>
    <Image source={require('@/assets/images/Drake.png')} style={{width: 200, height: 200, borderRadius: 100}}/>
    </View>
    <View style={{justifyContent:'center', alignItems: 'center'}}>
      <Text style={[Typography.heading._5, {color: theme === 'dark' ? '#FFFFFF' : '#212121', width: 260}]}>How was your experience
with Dr. Drake Boeson?</Text>
    </View>

    <View>
      <StarRating 
      rating={rating}
      onChange={setRating}
      maxStars={5}
      starSize={40}
      color='#246BFD'
      emptyColor='#246BFD'
      enableSwiping
      />
    </View>
    <View>
      <SvgXml xml={HorizontalLine} />
    </View>

    <View style={{alignSelf:'flex-start', gap: 16}}>
      <Text style={[Typography.heading._5, {color: theme === 'dark' ? '#FFFFFF' : '#212121'}]}>Write Your Review</Text>
      <TextInput
      placeholder='Your review here...'
      placeholderTextColor={theme === 'dark' ? '#FFFFFF' : '#212121'}
      style={{height: 140, width: 360,borderRadius: 16, backgroundColor: theme === 'dark' ? '#1F222A' : '#FAFAFA', }}
      />
    </View>

    <View style={{gap: 20, alignSelf: 'flex-start'}}>
      <Text style={[Typography.heading._5, {color: theme === 'dark' ? '#FFFFFF' : '#212121'}]}>Would you recommend Dr. Drake Boeson to your friends?</Text>

      <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=> props.onChange(props.label)}
      style={[props.buttonStyle,{flexDirection: 'row', gap: 24}]}
      >
      <View style={[styles.radio, props.radioSize ? { width: props.radioSize, height: props.radioSize, borderRadius: props.radioSize} : null ]}>
      {props.activeButton === props.label ? (
        <View style={[styles.fill, props.radioSize ? { width: props.radioSize / 1.6, height: props.radioSize / 1.6, borderRadius: props.radioSize} : null]}></View>
      ) : null }
      </View>

      <View style={[styles.radio, props.radioSize ? { width: props.radioSize, height: props.radioSize, borderRadius: props.radioSize} : null ]}>
      {props.activeButton === props.label ? (
        <View style={[styles.fill, props.radioSize ? { width: props.radioSize / 1.6, height: props.radioSize / 1.6, borderRadius: props.radioSize} : null]}></View>
      ) : null }
      </View>

      <Text>{props.label}</Text>

      </TouchableOpacity>
    </View>

    </View>
  )
}

export default ReviewBlankform

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 24
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#246BFD'
  },
  fill: {
    backgroundColor: '#246BFD',
    width: 12,
    height: 12,
    borderRadius: 6,
  },

})