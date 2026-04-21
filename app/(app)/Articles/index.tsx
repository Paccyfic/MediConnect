import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FieldComponent from "@/components/FieldComponent";
import ArticleCard from "@/components/cards/ArticleCard";
import { router } from "expo-router";
import { ThemeContext } from "@/ctx/ThemeContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import Typography from "@/constants/Typography";
import { supabase } from "@/lib/supabase";
import { SvgXml } from "react-native-svg";
import { Logo } from "@/assets/icons/Logo";
interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

type FetchError = string | null;
type FetchArticle = Article[] | null;


const tableName = "Articles";

export default function Article() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const [fetchArticle, setFetchArticle] = useState<FetchArticle>(null);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase.from(tableName).select();

      if (error) {
        setFetchError("Could not fetch articles");
        setFetchArticle(null);
      }

      if (data) {
        setIsLoading(false);
        setFetchArticle(data);
        setFetchError(null);
      }
    };
    fetchArticles();
  }, []);
  return (
    <SafeAreaView
      style={{
        paddingTop: 40,
        flex: 1,
        backgroundColor: theme === "light" ? "#FFFFFF" : "#181A20",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <SvgXml xml={Logo} />
            <Text
              style={{
                fontSize: 24,
                color: theme === "light" ? "#212121" : "#FFFFFF",
                fontWeight: "500",
              }}
            >
              Article
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="search-outline"
                size={24}
                style={{ color: theme === "light" ? "#212121" : "#FFFFFF" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>router.push("(app)/Articles/BookMarkedArticles")}>
              <FontAwesome
                name="bookmark"
                size={22}
                style={{
                  color: theme === "light" ? "#212121" : "#FFFFFF",
                }}
              />
              </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: theme === "light" ? "#212121" : "#FFFFFF",
              fontWeight: "500",
            }}
          >
            Trending
          </Text>
          <TouchableOpacity
            onPress={() => router.push("Articles/ArticleSeeAll")}
          >
            <Text
              style={{
                color: theme === "light" ? "#246BFD" : "#246BFD",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {IsLoading ? (
            <ActivityIndicator
              color="#246BFD"
              size="large"
              style={{ marginLeft: "10%" }}
            />
          ) : (
            <View style={{ flexDirection: "row" }}>
              {fetchError && <Text>{fetchError}</Text>}

              {fetchArticle &&
                fetchArticle.map((article) => (
                  <View key={article.id} style={{ marginLeft: 15 }}>
                    <View style={{ flexDirection: "column" }}>
                      <TouchableOpacity>
                        <Image
                          style={{
                            height: 140,
                            width: 220,
                            borderRadius: 20,
                          }}
                          source={{ uri: article.image }}
                        />
                      </TouchableOpacity>
                      <Text
                        style={[
                          Typography.bold.large,
                          {
                            fontSize: 18,
                            color: theme === "light" ? "#212121" : "#FFFFFF",
                            width: 230,
                            flexWrap: "wrap",
                            paddingTop: 15,
                          },
                        ]}
                      >
                        {article.title}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: theme === "light" ? "#212121" : "#FFFFFF",
              fontWeight: "500",
            }}
          >
            Articles
          </Text>
          <TouchableOpacity
            onPress={() => router.push("Articles/ArticleSeeAll")}
          >
            <Text
              style={{
                color: theme === "light" ? "#246BFD" : "#246BFD",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <ArticleCard />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
