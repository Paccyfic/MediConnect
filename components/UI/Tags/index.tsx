import { useState } from "react";
import React from "react";
import Chips from "../ChipsComponent";
import { ScrollView } from "react-native";

interface Props {
  data: string[];
}

export default function TagsContainer({ data }: Props) {
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);

  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {data.map((tag, index) => (
          <Chips
            key={index}
            text={tag}
            type={data[selectedTagIndex] === tag ? "filled" : "border"}
            onPress={() => {
              setSelectedTagIndex(index);
            }}
            size="medium"
            style={{ marginRight: 10 }}
          />
        ))}
      </ScrollView>
    </>
  );
}
