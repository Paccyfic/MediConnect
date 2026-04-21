import React, { useContext } from "react";
import { BlackDeleteIcon, deleteWhiteIcon } from "@/components/UI/icons/deleteIcon"
import { BlackDownloadIcon, downloadWhiteIcon } from "@/components/UI/icons/downloadIcon"
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { ThemeContext } from "@/ctx/ThemeContext";

interface MenuComponentProps {
  closeMenu: () => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({closeMenu})=>{
    const { theme, changeTheme } = useContext(ThemeContext);

    return(
      <View style={{
        gap: 15,
        backgroundColor: theme ==="dark"?  Colors.others.black :Colors.others.white,
        padding: 20,
        borderRadius: 10
      }}>
        <TouchableOpacity style={styles.iconText}
        onPress={closeMenu}>
          <SvgXml xml={theme === "dark"? deleteWhiteIcon :BlackDeleteIcon}/>
          <Text style={[Typography.bold.medium, {color: theme==="dark"? "white": "black"}]}>Clear Chat</Text>
        </TouchableOpacity>
        <View style={{borderColor: "rgba(0, 0, 0,0.2 )", borderWidth: 0.3}}></View>
        <TouchableOpacity style={styles.iconText}
        onPress={closeMenu}>
          <SvgXml xml={theme==="dark"? downloadWhiteIcon :BlackDownloadIcon} />
          <Text style={[Typography.bold.medium, {color: theme==="dark"? "white": "black"}]}>Export Chat</Text>
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

  export default MenuComponent