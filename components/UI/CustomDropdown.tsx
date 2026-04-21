import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { ThemeContext } from '@/ctx/ThemeContext';
import {
  DropDownIcon,
  DropDownIconDark,
} from '@/assets/icons/Profile/Icons';
import { color } from 'react-native-elements/dist/helpers';

interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  placeholder: string;
  items: DropdownItem[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  leftIcon?: () => React.JSX.Element;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  placeholder,
  items,
  selectedValue,
  onValueChange,
  leftIcon,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <View  style={{
        backgroundColor:
          theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
      }}>
        {leftIcon && leftIcon()}
    
    <Dropdown
     
      placeholderStyle={[Typography.semiBold.medium,{color: Colors.grayScale._500,}]}
      selectedTextStyle={[
        Typography.semiBold.medium,
        {
          color:
            theme === "light"
              ? Colors.grayScale._900
              : Colors.others.white,
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
      }}
      data={items}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder : "..."}
      searchPlaceholder="Search..."
      value={selectedValue}
      search
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        onValueChange(item.value);
        setIsFocus(false);
      }}
      renderRightIcon={() => (
        <SvgXml
          xml={theme === "light" ? DropDownIcon : DropDownIconDark}
        />
      )}
      itemTextStyle={{
        color:
          theme === "light" ? Colors.grayScale._900 : Colors.others.white,
      }}
    />
    </View>
  );
};

export default CustomDropdown;
