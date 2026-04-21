import { FlatList } from "react-native";
import PackageItem from "./UI/PackageItem";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  data: {
    id: string;
    title: string;
    price: string;
    icon: () => React.JSX.Element;
    description: string;
  }[];
  onPackageSelect:(title:string,price:string)=>void
}

export default function PackagesContainer({ data,onPackageSelect}: Props) {
  const [selectedPackage, setSelectedPackage] = useState("0");
  const { theme, changeTheme } = useContext(ThemeContext);
  
  return (
    <>
    {data.map((item) => (
      <PackageItem
        key={item.id}
        title={item.title}
        description={item.description}
        price={item.price}
        icon={item.icon}
        selected={selectedPackage === item.id}
        onPress={() => {
          setSelectedPackage(item.id);
          onPackageSelect(item.title, item.price);
        }}
      />
    ))}
  </>
  );
}
