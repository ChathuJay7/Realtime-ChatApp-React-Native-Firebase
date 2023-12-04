import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const MessageCard = () => {
  return (
    <TouchableOpacity className="w-full flex-row items-center justify-start py-2">
        {/* Image */}
        <View className="h-16 w-16 rounded-full flex items-center border-2 border-primary p-1 justify-center">
            <FontAwesome name="users" color="#555"/>
        </View>
        {/* Content */}
        <View className="flex-1 flex items-start justify-center ml-4">
            <Text className="text-[#333] text-base font-semibold capitalize">Message Title</Text>
            <Text className="text-primaryText text-sm">Lorem ipsum dolor sit amet tetur adipis adip isicing icing elit....</Text>
        </View>
        {/* Time Text */}
        <Text className="text-primary px-4 text-base font-semibold">27 min</Text>
    </TouchableOpacity>
  )
}

export default MessageCard

const styles = StyleSheet.create({})