import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { BGImage, Logo } from "../assets";
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { avatars } from "../utils/supports";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
  const [isAvatarMenu, setIsAvatarMenu] = useState(false);
  const [getEmailValidatedStatus, setGetEmailValidatedStatus] = useState(false);

  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);
  const navigation = useNavigation();

  const handleAvatar = (item) => {
    setAvatar(item?.image.asset.url);
    setIsAvatarMenu(false);
  };

  const handleSignUp = async() => {
    if(getEmailValidatedStatus && email !== ""){
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCred) => {
        console.log(userCred.user);
        const data = {
          _id: userCred?.user.uid,
          fullName: name,
          profilePic: avatar,
          providerData: userCred?.user.providerData[0]
        }

        setDoc(doc(firestoreDB, 'users', userCred?.user.uid), data)
        .then(() => {
          navigation.navigate("LoginScreen")
        })
      })
    }
  }

  return (
    <View
      
      className="flex-1 items-center justify-center"
      style={styles.AndroidSafeArea}
    >
      <Image
        source={BGImage}
        className="h-96"
        style={{ width: screenWidth }}
        resizeMode="cover"
      />

      {isAvatarMenu && (
        <>
          <View
            className="absolute z-10 5"
            style={{
              height: screenHeight,
              width: screenWidth,
              //top: styles.AndroidSafeArea,
            }}
          >
            <ScrollView>
              <BlurView
                className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly"
                tint="light"
                intensity={40}
                style={{ height: screenHeight, width: screenWidth }}
              >
                {avatars.map((item) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleAvatar(item);
                    }}
                    key={item._id}
                    className="w-20 h-20 m-3 p-1 rounded-full border-2 border-primary relative"
                  >
                    <Image
                      source={{ uri: item?.image.asset.url }}
                      className="h-full w-full"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </BlurView>
            </ScrollView>
          </View>
        </>
      )}

      {/* Main View */}
      <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 items-center justify-start py-6 px-6 space-y-6">
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-primaryText text-xl font-semibold">
          Join with us!
        </Text>

        {/* Avatar Section */}
        <View className="w-full flex items-center justify-center relative -my-4">
          <TouchableOpacity
            onPress={() => setIsAvatarMenu(true)}
            className="w-20 h-20 p-1 rounded-full border-2 border-primary relative"
          >
            <Image
              source={{ uri: avatar }}
              className="w-full h-full"
              resizeMode="contain"
            />
            <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-centerX">
              <MaterialIcons name="edit" size={18} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>

        <View className="w-full flex items-center justify-center">
          <UserTextInput
            placeholder="Full Name"
            isPass={false}
            setStateValue={setName}
          />
          <UserTextInput
            placeholder="Email"
            isPass={false}
            setStateValue={setEmail}
            setGetEmailValidatedStatus={setGetEmailValidatedStatus}
          />
          <UserTextInput
            placeholder="Password"
            isPass={true}
            setStateValue={setPassword}
          />

          {/* Login Button */}
          <TouchableOpacity onPress={handleSignUp} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
            <Text className="py-2 text-white text-xl font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>

          <View className="w-full flex-row py-5 items-center justify-center space-x-2">
            <Text className="text-base text-primaryText">
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text className="text-base font-semibold text-primaryBold">
                Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
