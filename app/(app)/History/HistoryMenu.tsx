import React, { useContext } from "react"
import { BlackDeleteIcon, RedDeleteIcon } from "@/components/UI/icons/deleteIcon"
import { BlackDownloadIcon, downloadWhiteIcon } from "@/components/UI/icons/downloadIcon"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"
import {Colors} from "@/constants/Colors"
import Typography from "@/constants/Typography"
import { ThemeContext } from "@/ctx/ThemeContext"

interface MenuComponentProps {
  closeMenu: () => void;
  method: string
}

const HistoryMenu: React.FC<MenuComponentProps> = ({closeMenu, method})=>{
  const {theme, changeTheme} = useContext(ThemeContext)


    return(
      <View style={{
        gap: 15,
        backgroundColor: theme === "dark" ? Colors.dark._3: "white",
        padding: 20,
        borderRadius: 20
      }}>
         <TouchableOpacity style={styles.iconText}
        onPress={closeMenu}>
          <SvgXml xml={ theme === "dark"? downloadWhiteIcon:BlackDownloadIcon} />
          <Text style={[Typography.medium.medium, {color: theme==="dark"? Colors.others.white: Colors.others.black}]}>Download {method}</Text>
        </TouchableOpacity>
        <View style={{borderColor: "rgba(0, 0, 0,0.2 )", borderWidth: 0.3}}></View>
        <TouchableOpacity style={styles.iconText}
        onPress={closeMenu}>
          <SvgXml xml={RedDeleteIcon}/>
          <Text style={[Typography.medium.medium, {color: Colors.others.red}]}>Delete {method}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const styles = StyleSheet.create({
    iconText:{
        flexDirection: "row", 
        alignItems: "center",
        gap: 20
    }
  })

  export default HistoryMenu