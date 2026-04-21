import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import FieldComponent from "@/components/FieldComponent";
import ArticleCard from "@/components/cards/ArticleCard";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ThemeContext } from "@/ctx/ThemeContext";

export default function SeeAllArticles() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState("Newest");
  const categories = ["all", "Health", "Covid", "Lifestyle", "News"]; // Example categories

  return (
    <SafeAreaView
      style={{
        paddingTop: 40,
        backgroundColor: theme === "light" ? "#FFFFFF" : "#181A20",
        height: "100%",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 15,
              padding: 15,
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={{
                paddingTop: 5,
              }}
            >
              <MaterialIcons
                name="arrow-back"
                size={23}
                style={{
                  alignSelf: "center",
                  color: theme === "light" ? "#212121" : "#FFFFFF",
                }}
              />
            </Pressable>
            <Text
              style={{
                fontSize: 24,
                color: theme === "light" ? "#212121" : "#FFFFFF",
              }}
            >
              Articles
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 15,
              padding: 15,
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="search-outline"
                size={24}
                style={{ color: theme === "light" ? "#212121" : "#FFFFFF" }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal-circle-outline"
                size={24}
                style={{ color: theme === "light" ? "#212121" : "#FFFFFF" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <ArticleCard />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
