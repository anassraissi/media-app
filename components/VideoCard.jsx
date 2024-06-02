import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from "expo-av";
const VideoCard = ({title,thumbnail,video,username,avatar}) => {
  const [play, setPlay] = useState(false)
  return (
  
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1"> 
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />  
          </View>
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
          </View>
          <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
        {play ? (
                  <Video
                  source={{ uri: video }}
                  className=" w-full h-72 rounded-[33px] mt-3 bg-white/10"
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls
                  shouldPlay 
                  //shouldPlay:   This prop controls the initial playback state. Here, it's set to true,
                  //  indicating the video should start playing when the component mounts
                  onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                      setPlay(false);
                    }
                  }}
                  //onPlaybackStatusUpdate: This prop is a callback function that receives updates about the video's playback status.
                  //  In this case, it checks for the didJustFinish event,
                  //  which indicates the video has finished playing, and sets the play state to false to stop playback
                />
        ):
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
        <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
        }
          </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({})