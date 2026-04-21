import { useState } from "react";
import { FlatList } from "react-native";
import { typedCountries } from "@/constants/Languages";
import LanguageListing from "@/components/Profile/LanguageListing";

export default function LanguagesList() {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <>
      <FlatList
        data={Object.keys(typedCountries).map((key) => {
          return typedCountries[key].name;
        })}
        renderItem={({ item, index }) => (
          <LanguageListing
            name={item}
            onPress={() => {
              setSelectedOption(index);
            }}
            selected={selectedOption === index}
          />
        )}
        contentContainerStyle={{ gap: 20 }}
      />
    </>
  );
}
