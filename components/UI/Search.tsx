import index from "@/app/(app)/Articles";
import {
  BlackHorizontalLine,
  HorizontalLine,
} from "@/assets/icons/HorizantalLine";
import { FilterIcon, SearchIcon } from "@/assets/icons/Profile/Icons";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native";
import { SvgXml } from "react-native-svg";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useContext, useState } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import HorizontalSeparator from "./HorizontalSeparator";

interface Props {
  onchange: () => void;
}
export default function Search({ onchange }: Props) {
  const [selectedItem, setSelectedItem] = useState("1");
  const [focused, setFocused] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <View
        style={{
          position: "relative",
          zIndex: 200,
          alignItems: "center",
        }}
      >
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          dataSet={[
            { id: "1", title: "What is Medica?" },
            { id: "2", title: "How to use Medica?" },
            { id: "3", title: "How do I cancel an appointment?" },
            { id: "4", title: "How do I save the recording?" },
            { id: "5", title: "How do I exit the app?" },
          ]}
          LeftComponent={<SvgXml xml={SearchIcon} />}
          RightIconComponent={<SvgXml xml={FilterIcon} />}
          containerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 20,
          }}
          suggestionsListTextStyle={{
            borderRadius: 20,
            color:
              theme === "light" ? Colors.grayScale._900 : Colors.others.white,
          }}
          suggestionsListContainerStyle={{
            borderRadius: 15,
            paddingHorizontal: 15,
            backgroundColor:
              theme === "light" ? Colors.others.white : Colors.dark._2,
          }}
          showChevron={false}
          showClear={false}
          inputContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: focused
              ? Colors.transparent.blue
              : theme === "light"
              ? Colors.grayScale._100
              : Colors.dark._2,
            borderWidth: 1,
            borderColor: focused
              ? Colors.main.primary._500
              : theme === "light"
              ? Colors.grayScale._100
              : Colors.dark._2,
          }}
          textInputProps={{
            style: {
              color:
                theme === "light" ? Colors.grayScale._900 : Colors.others.white,
            },
            placeholderTextColor: Colors.grayScale._500,
            placeholder: "Search",
          }}
          onFocus={() => {
            setFocused((prevVal) => !prevVal);
          }}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          EmptyResultComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
                <Text
                  style={{
                    color:
                      theme === "light"
                        ? Colors.grayScale._900
                        : Colors.others.white,
                  }}
                >
                  Nothing
                </Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
