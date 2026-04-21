import React, { useContext, useState } from 'react';
import { Platform, View, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgXml } from 'react-native-svg';
import Input from "@/components/UI/Input";
import { ThemeContext } from "@/ctx/ThemeContext";
import { CalenderIcon, CalenderIconDark } from '@/assets/icons/Profile/Icons';

const DateInputPicker: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <View>
      <Pressable onPress={showDatepicker}>
        <Input
          placeholder={formatDate(date)}
          name="date_of_birth"
          value={formatDate(date)}
          editable={false}
          rightElement={() => (
            <SvgXml xml={theme === "light" ? CalenderIcon : CalenderIconDark} />
          )}
        />
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateInputPicker;
