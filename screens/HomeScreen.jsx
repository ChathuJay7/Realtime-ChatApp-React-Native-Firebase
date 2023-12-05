import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Logo } from "../assets";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { MessageCard } from "../components";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const HomeScreen = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  console.log("Logged user : ", user);

  useLayoutEffect(() => {
    const chatQuery = query(collection(firestoreDB, "chats"), orderBy("__id", "desc"));

    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    })
    
    console.log("Chats : ",chats)
    // Return unsubscribe function to stop listening to the updates
    return unsubscribe;

    
  }, [])

  return (
    <View style={styles.AndroidSafeArea} className="flex-1">
      <SafeAreaView>
        <View className="w-full flex-row items-center justify-between px-4 py-2">
          <Image source={Logo} className="w-12 h-12" resizeMode="contain" />
          <TouchableOpacity className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
            <Image
              source={{ uri: user?.profilePic }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Scroll View */}
        <ScrollView className="w-full px-4 pt-4">
          <View className="w-full">
            {/* Messages Title */}
            <View className="w-full flex-row items-center justify-between px-2">
              <Text className="text-primaryText text-base font-extrabold pb-3">
                Messages
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("AddToChatScreen")}>
                <Ionicons name="chatbox" size={28} color="#555" />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <>
                <View className="w-full flex items-center justify-center">
                  <ActivityIndicator size={"large"} color={"#43C651"} />
                </View>
              </>
            ) : (
              <>
                {chats && chats.length > 0 ? (
                <>
                {chats?.map(room => (
                  <MessageCard key={room.__id} room={room}/>
                ))}
                </>
                ) : (
                <>
                </>)}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
