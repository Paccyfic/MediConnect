import {
  Ionicons,
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import { supabase } from "@/lib/supabase";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Share,
  Alert,
  ToastAndroid,
} from "react-native";
import Typography from "@/constants/Typography";
import Article from ".";
import { AuthContext } from "@/ctx/AuthContext";
import { fetchPatientData } from "@/utils/LoggedInUser";

interface Article {
  title: string;
  created_at: ReactNode;
  image: string;
  id: string;
  description: string;
  category: string;
}
type FetchArticle = Article[] | null;
type FetchError = string | null;


const tableName = "Articles";

export default function ArticlesDetails() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [fetchArticle, setFetchArticle] = useState<FetchArticle>(null);
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const { id } = useLocalSearchParams();
  const [bookmarkedArticle, setBookmarkedArticle] = useState<string[]>([]);
  const [isBookMarked, setIsBookMarked] = useState<Boolean>(false)
  const [patientData, setPatientData] = useState([])

const { userId, email } = useContext(AuthContext);

useEffect(() => {
  if (userId) {
    fetchPatientData(userId, setPatientData);
  }
}, [userId]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id);

      if (error) {
        setFetchArticle(null);
        setFetchError("could not fetch description articles in database");
      }
      if (data) {
        setFetchError(null);
        setFetchArticle(data);
      }
    };
    fetchArticles();
  }, []);

  const articleurl = `https://example.com/articles/${Article.id}`;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Please Check out this article: ${articleurl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  
  const bookMarkArticle = async () => {
    try {
      const { data: existingBookmarks, error: bookmarkError } = await supabase
        .from('marked_articles')
        .select('*')
        .eq('user_id', patientData[0]?.id)
        .eq('article_id', id);
  
      if (existingBookmarks && existingBookmarks.length >= 1) {
        ToastAndroid.show("You have already bookmarked this article.", ToastAndroid.SHORT);
        return;
      }
  
      const { data, error } = await supabase
        .from('marked_articles')
        .insert({ user_id: patientData[0]?.id, article_id: id });
  
      if (error) {
        ToastAndroid.show("Unable to bookmark the article.", ToastAndroid.SHORT);
        return;
      }
  
      ToastAndroid.show("Article Bookmarked!", ToastAndroid.SHORT);
      setIsBookMarked(true);
    } catch (error) {
      setIsBookMarked(false);
      ToastAndroid.show("Can't bookmark the article.", ToastAndroid.SHORT);
    }
  };
  

  const unBookMarkArticle = async () => {
    try {
      const { data: existingBookmarks, error: bookmarkError } = await supabase
        .from('marked_articles')
        .select('*')
        .eq('user_id', patientData[0]?.id)
        .eq('article_id', id);
  
      if (existingBookmarks && existingBookmarks.length > 0) {
        const { data, error } = await supabase
          .from('marked_articles')
          .delete()
          .eq('user_id', patientData[0]?.id)
          .eq('article_id', id);
  
        if (error) {
          ToastAndroid.show("Unable to unbookmark the article.", ToastAndroid.SHORT);
          return;
        }
  
        ToastAndroid.show("Article Unbookmarked!", ToastAndroid.SHORT);
        setIsBookMarked(false);
      } else {
        ToastAndroid.show("This article is not bookmarked.", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("Can't unbookmark the article.", ToastAndroid.SHORT);
    }
  };
  


  return (
    <SafeAreaView
      style={{
        paddingTop: 50,
        paddingBottom: 100,
        backgroundColor: theme === "light" ? "#FFFFFF" : "#181A20",
      }}
    >
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
          <Pressable onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={25}
              style={{
                alignSelf: "center",
                color: theme === "light" ? "#212121" : "#FFFFFF",
              }}
            />
          </Pressable>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 15,
          }}
        >
           <View>
            {isBookMarked 
              ? (<TouchableOpacity
              onPress={()=> unBookMarkArticle()}

              >
                   <FontAwesome
                name="bookmark"
                size={22}
                style={{
                  color: theme === "light" ? "#212121" : "#FFFFFF",
                }}
              />
              </TouchableOpacity>
             
            ) : (
            
              <TouchableOpacity
              onPress={()=> bookMarkArticle()}
              >
                <FontAwesome
                name="bookmark-o"
                size={22}
                style={{
                  color: theme === "light" ? "#212121" : "#FFFFFF",
                }}/>
              </TouchableOpacity>
              )
            }
           </View>

          <TouchableOpacity onPress={onShare}>
            <Ionicons
              name="paper-plane-outline"
              size={22}
              style={{ color: theme === "light" ? "#212121" : "#FFFFFF" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {fetchError && <Text>{fetchError}</Text>}
        {fetchArticle &&
          fetchArticle.map((article) => (
            <View
              key={article.id}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 10,
                gap: 5,
              }}
            >
              <TouchableOpacity>
                {article.image && (
                  <Image
                    style={{
                      height: 240,
                      width: "100%",
                      borderRadius: 24,
                      justifyContent: "center",
                    }}
                    source={{ uri: article.image }}
                  />
                )}
              </TouchableOpacity>
              <View>
                <Text
                  style={[
                    Typography.heading._4,
                    {
                      fontSize: 21,
                      color: theme === "light" ? "#212121" : "#FFFFFF",
                      paddingLeft: 10,
                      position: "relative",
                      marginTop: 3,
                      fontWeight: "600",
                    },
                  ]}
                >
                  {article.title}
                </Text>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 15,
                    gap: 10,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={[
                      Typography.medium.small,
                      {
                        color: theme === "light" ? "#424242" : "#FFFFFF",
                        fontSize: 10,
                        marginTop: 10,
                      },
                    ]}
                  >
                    {article.created_at}
                  </Text>
                  <Text
                    style={{
                      color: theme === "light" ? "#246BFD" : "#246BFD",
                      fontSize: 10,
                      backgroundColor:
                        theme === "light"
                          ? "rgba(36, 107, 253, 0.08)"
                          : "rgba(36, 107, 253, 0.08)",
                      borderRadius: 6,
                      height: 24,
                      width: 59,
                      textAlign: "center",
                      padding: 5,
                      marginTop: 5,
                    }}
                  >
                    {article.category}
                  </Text>
                </View>
              </View>
              <View style={{ flexWrap: "wrap", margin: -10, paddingLeft: 20 }}>
                <View style={{ paddingRight: 15 }}>
                  <Text
                    style={[
                      Typography.medium.xLarge,
                      {
                        fontSize: 18,
                        color: theme === "light" ? "#424242" : "#FFFFFF",
                      },
                    ]}
                  >
                    {article.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
