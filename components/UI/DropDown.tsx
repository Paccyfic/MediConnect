import { DropDownIcon, DropDownIconDark } from "@/assets/icons/Profile/Icons";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import React, { useContext, useState,useEffect } from "react";
import { View } from "react-native";
import { Dropdown as DropDownInput } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

interface Props {
  data: { label: string; value: string }[];
  leftIcon?: () => React.JSX.Element;
  rightIcon?: () => React.JSX.Element;
  search?: boolean;
  defaultValue?: string;
  onSelect?:(value:string)=>void
}

export default function DropDown({ data, leftIcon, rightIcon, search,defaultValue,onSelect }: Props) {
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = useState<string>(defaultValue||data[0].value||"");
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue])

  return (
    <>
      <DropDownInput
        style={{
          backgroundColor:
            theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}
        placeholderStyle={[Typography.semiBold.medium]}
        selectedTextStyle={[
          Typography.semiBold.medium,
          {
            color:
              theme === "light" ? Colors.grayScale._900 : Colors.others.white,
          },
        ]}
        containerStyle={{
          borderRadius: 20,
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._2,
          borderWidth: 0,
        }}
        inputSearchStyle={{
          height: 40,
          fontSize: 16,
          borderRadius: 10,
          flexDirection: "row",
          paddingHorizontal: 20,
          gap: 20,
          backgroundColor: theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
        }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        search={search}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          if (onSelect) {
            onSelect(item.value)
          }
        }}
        
        renderLeftIcon={() => (
          <>
            {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon()}</View>}
          </>
        )}
        renderRightIcon={() => (
          <>
            {rightIcon ? (
              rightIcon()
            ) : (
              <SvgXml
                xml={theme === "light" ? DropDownIcon : DropDownIconDark}
              />
            )}
          </>
        )}
        itemTextStyle={{
          color:
          theme === "light" ? Colors.grayScale._900 : Colors.main.primary._500,        }}
      />
    </>
  );
}
