import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { router } from "expo-router";
import FieldComponent from "@/components/FieldComponent";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ThemeContext } from "@/ctx/ThemeContext";
import { AuthContext } from "@/ctx/AuthContext";
import { fetchPatientData } from "@/utils/LoggedInUser";
import { supabase } from "@/lib/supabase";
import Typography from "@/constants/Typography";
import { ActivityIndicator } from "react-native";

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


export default function BookMarkedArticles() {
  const { theme} = useContext(ThemeContext);
  const { userId, email } = useContext(AuthContext);
  const [patientData, setPatientData] = useState([]);
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const [fetchArticle, setFetchArticle] = useState<FetchArticle>(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Health', 'Covid-19', 'Lifestyle', 'Medical']; 

useEffect(() => {
  if (userId) {
    fetchPatientData(userId, setPatientData);
  }
}, [userId]);

useEffect(() => {
  const fetchArticles = async () => {
    try {
      if (!patientData[0]?.id) {
        setIsLoading(false);
        setFetchArticle(null);
        setFetchError("User ID not available");
        return;
      }

      let response;
      if (selectedCategory === 'All') {
        response = await supabase.from('marked_articles').select('Articles(*)');
      } else {
        response = await supabase
          .from('marked_articles')
          .select('Articles(*)')
          .eq('user_id', patientData[0]?.id)
          .eq('category', selectedCategory);
      }

      const { data, error } = response;

      if (error) {
        setFetchError("Could not fetch articles");
        setFetchArticle(null);
      } else {
        setIsLoading(false);
        setFetchArticle(data);
        setFetchError(null);
      }
    } catch (error) {
      console.error('Error fetching articles:', error.message);
      setFetchError("Could not fetch articles");
      setFetchArticle(null);
    }
  };

  fetchArticles();
}, [selectedCategory, patientData]);


  const handleArticlePress = (articleId: string) => {
    router.push({
      pathname: "(app)/Articles/[ArticleDetails]",
      params: { id: articleId },
    });
  };



  return (
    <SafeAreaView
      style={{
        paddingTop: 40,
        backgroundColor: theme === "light" ? "#FFFFFF" : "#181A20",
        height: "100%",
      }}
    >
      <View>
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
              Book Marked 
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

        <View>
        <View style={{ padding: 5 }}>
          <FieldComponent
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          />
        </View>
        </View>

        <View
          style={{ marginTop: 10 }}
        >
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
        <FlatList
        data={fetchArticle}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleArticlePress(item.Articles?.id)}
            style={{ flexDirection: "row", gap: 16, marginBottom: 10 }}
          >
            <Image
              style={{ height: 120, width: 120, borderRadius: 20 }}
              source={{ uri: item?.Articles?.image }}
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
                {item?.Articles?.created_at}
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
                {item?.Articles?.title}
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
                {item?.Articles?.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item?.Articles?.id}
      />
        }
        </View>
      )}
        </View>
      </View>
    </SafeAreaView>
  );
}
