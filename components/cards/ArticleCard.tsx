import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/ctx/ThemeContext";
import Typography from "@/constants/Typography";
import { supabase } from "@/lib/supabase";
import FieldComponent from "../FieldComponent";

interface Article {
  created_at: ReactNode;
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

type FetchError = string | null;
type FetchArticle = Article[] | null;


const tableName = "Articles";

export default function ArticleCard() {
  const { theme } = useContext(ThemeContext);
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const [fetchArticle, setFetchArticle] = useState<FetchArticle>(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Health', 'Covid-19', 'Lifestyle', 'Medical']; 
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let data;
        if (selectedCategory === 'All') {
          const response = await supabase.from(tableName).select();
          data = response.data;
        } else {
          const response = await supabase
            .from(tableName)
            .select()
            .eq('category', selectedCategory);
          data = response.data;
        }

        setIsLoading(false);
        setFetchArticle(data);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
        setFetchArticle(null);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  const handleArticlePress = (articleId: string) => {
    router.push({
      pathname: "(app)/Articles/[ArticleDetails]",
      params: { id: articleId },
    });
  };

  return (
    <View>
        <View style={{ padding: 5 }}>
          <FieldComponent
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          />
        </View>
      {IsLoading ? (
        <ActivityIndicator
          color="#246BFD"
          size="large"
          style={{ marginLeft: "5%", marginTop: "80%" }}
        />
      ) : (
        <View style={{ padding: 10, gap: 16 }}>
          {fetchError && <Text>{fetchError}</Text>}

          {fetchArticle &&
            fetchArticle.map((article) => (
              <TouchableOpacity
                key={article.id}
                onPress={() => handleArticlePress(article.id)}
                style={{ flexDirection: "row", gap: 16, marginBottom: 10 }}
              >
                <Image
                  style={{ height: 120, width: 120, borderRadius: 20 }}
                  source={{ uri: article.image }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    paddingRight: 15,
                  }}
                >
                  <Text
                    style={[
                      Typography.medium.xSmall,
                      {
                        color: theme === "light" ? "#424242" : "#FFFFFF",
                        fontSize: 10,
                      },
                    ]}
                  >
                    {article.created_at}
                  </Text>
                  <Text
                    style={[
                      Typography.bold.large,
                      {
                        fontSize: 16,
                        color: theme === "light" ? "#212121" : "#FFFFFF",
                      },
                    ]}
                    numberOfLines={3}
                  >
                    {article.title}
                  </Text>
                  <Text
                    style={{
                      color: theme === "light" ? "#246BFD" : "#246BFD",
                      fontSize: 10,
                      backgroundColor: "rgba(36, 107, 253, 0.08)",
                      borderRadius: 6,
                      height: 24,
                      width: 59,
                      textAlign: "center",
                      padding: 5,
                      marginTop: 10,
                    }}
                  >
                    {article.category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
}
