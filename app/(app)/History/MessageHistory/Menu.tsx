import React, { useContext } from "react";
import { BlackDeleteIcon, RedDeleteIcon, deleteWhiteIcon } from "@/components/UI/icons/deleteIcon"
import { BlackDownloadIcon, downloadWhiteIcon } from "@/components/UI/icons/downloadIcon"
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { StyleSheet, Text, Pressable, View } from "react-native"
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
        backgroundColor: theme === "dark" ? Colors.dark._1: Colors.others.white,
        padding: 20,
        borderRadius: 20,
        elevation: 10
      }}>
        <Pressable style={styles.iconText}
        onPress={closeMenu}>
          <SvgXml xml={theme === "dark" ? deleteWhiteIcon : BlackDeleteIcon}/>
          <Text style={[Typography.bold.medium, {color: theme==="dark" ? Colors.others.white: Colors.others.black}]}>Clear Chat</Text>
        </Pressable>
        <View style={{borderColor: "rgba(0, 0, 0,0.2 )", borderWidth: 0.3}}></View>
        <Pressable style={styles.iconText}
        onPress={closeMenu}>
          <SvgXml xml={theme === "dark"? downloadWhiteIcon : BlackDownloadIcon} />
          <Text style={[Typography.bold.medium, {color: theme==="dark" ? Colors.others.white: Colors.others.black}]}>Export Chat</Text>
        </Pressable>
        <Pressable style={styles.iconText}
        onPress={()=>closeMenu()}>
          <SvgXml xml={RedDeleteIcon} />
          <Text style={[Typography.bold.medium,{color: Colors.others.red}]}>Export Chat</Text>
        </Pressable>
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