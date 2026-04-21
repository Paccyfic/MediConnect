
import {Colors} from '@/constants/Colors';
import React from 'react'
import { View, StyleSheet, useWindowDimensions,  Animated } from 'react-native'
const Paginator = ({data, scrollX}: {data: any, scrollX: any}) => {
    const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: "row", height: 64}}>
    
        {
            data.map((item: any, i: any) => {
                const inputRange = [(i-1) * width, i * width, (i+1)* width];


                const backgroundColor = scrollX.interpolate({
                    inputRange,
                        outputRange: [`${Colors.grayScale._400}`, `${Colors.main.primary._500}`, `${Colors.grayScale._400}`],
                        extrapolate: "clamp",
                });

                return <Animated.View style={[styles.dot, {backgroundColor}]} key={i.toString()}/>
            })
        }
    </View>
  )
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
})

export default Paginator
