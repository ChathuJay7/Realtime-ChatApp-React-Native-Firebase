import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = ({ route }) => {
  const { room } = route.params;
  console.log(room);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const textInputRef = useRef(null);

  const navigation = useNavigation();

  const handleKeyboardOpen = () => {
    if(textInputRef.current) {
        textInputRef.current.focus();
    }
  }


  return (
    <View style={styles.AndroidSafeArea} className="flex-1">
      <View className="w-full bg-primary px-2 py-6 flex-[0.2] space-x-5">
        <View className="flex-row items-center justify-between w-full px-4 py-4">
          {/* Go Back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
          </TouchableOpacity>

          {/* Middle */}
          <View className="flex-row items-center justify-center space-x-3">
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
              <FontAwesome name="users" size={24} color={"#fbfbfb"} />
            </View>
            <View>
              <Text className="text-gray-50 text-base font-semibold capitalize">
                {room.chatName.length > 15
                  ? `${room.chatName.slice(0, 16)}..`
                  : room.chatName}
              </Text>
              <Text className="text-gray-50 text-base font-semibold capitalize">
                online
              </Text>
            </View>
          </View>

          {/* Last Section */}
          <View className="flex-row items-center justify-center space-x-3">
            <TouchableOpacity>
              <FontAwesome5 name="video" size={24} color={"#fbfbfb"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="phone" size={24} color={"#fbfbfb"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color={"#fbfbfb"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="w-full flex-[0.8] bg-white px-4 py-6 rounded-3xl rounded-t-[50px] -mt-10">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={160}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <>
                  <ActivityIndicator size={"large"} color={"#43C651"} />
                </>
              ) : (
                <>{/* Message */}</>
              )}
            </ScrollView>

            <View className="w-full flex-row items-center justify-center px-8">
              <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-center">
                <TouchableOpacity onPress={handleKeyboardOpen}>
                  <Entypo name="emoji-happy" size={24} color="#555" />
                </TouchableOpacity>
                <TextInput
                  className="flex-1 h-8 text-base text-primaryText font-semibold"
                  placeholder="Type here..."
                  placeholderTextColor={"#999"}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity>
                  <Entypo name="mic" size={24} color="#43C651" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="pl-4">
                  <FontAwesome name="send" size={24} color="#555" />
                </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
