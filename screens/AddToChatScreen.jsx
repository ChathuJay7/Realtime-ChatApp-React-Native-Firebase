import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const AddToChatScreen = () => {
  const [addChat, setAddChat] = useState("");

  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

  const createNewChat = async() => {
    let id = `${Date.now()}`

    const _doc = {
        __id: id,
        user: user,
        chatName: addChat
    }

    if(addChat !== ""){
        setDoc(doc(firestoreDB, "chats", id), _doc)
        .then(() => {
            setAddChat("");
            navigation.replace("HomeScreen");
        })
        .catch((err) => {
            alert("Error : ", err);
        })
    }
  }

  return (
    <View style={styles.AndroidSafeArea} className="flex-1">
      <View className="w-full bg-primary px-4 py-6 flex-[0.2]">
        <View className="flex-row items-center justify-between w-full px-4 py-6">
          {/* Go Back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
          </TouchableOpacity>

          {/* Middle */}

          {/* Last Section */}
          <View className="flex-row items-center justify-center space-x-3">
            <Image
              source={{ uri: user?.profilePic }}
              className="h-12 w-12"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="w-full flex-[0.8] bg-white px-4 py-6 rounded-3xl rounded-t-[50px] -mt-10">
        <View className="w-full px-4 py-4">
          <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3">
            {/* Icons? */}
            <Ionicons name="chatbubbles" size={24} color={"#777"} />
            {/* Text Input */}
            <TextInput
              className="flex-1 text-lg text-primaryText -mt-2 h-12 w-full"
              placeholder="Create a chat"
              placeholderTextColor={"#999"}
              value={addChat}
              onChangeText={(text) => setAddChat(text)}
            />
            {/* Icon */}
            <TouchableOpacity onPress={createNewChat}>
              <FontAwesome name="send" size={24} color={"#777"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddToChatScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
