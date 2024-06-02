import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { ResizeMode, Video } from "expo-av";
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  return (  
    <Animatable.View
      className="mr-4"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    > 
    {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-60 h-72 rounded-[33px] mt-3 bg-white/10"
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
      ) :
            <TouchableOpacity
            className="relative flex justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
          <ImageBackground
            source={{
              uri: item.thumbnail,  
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
          />
            </TouchableOpacity>
            }
          </Animatable.View>
        )
}
const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
    const ViewableItemsChanged=({viewableItems})=>{
        if(viewableItems.length >0){    //"If there are any visible items in the FlatList..."
          setActiveItem(viewableItems[0].key)  
        }
    }
  return (
    <FlatList
    data={posts}
     keyExtractor={(item)=>item.$id}
     renderItem={({item})=>(
      <TrendingItem activeItem={activeItem} item={item}/>
    )}
    horizontal
    onViewableItemsChanged={ViewableItemsChanged}
    viewabilityConfig={{
      itemVisiblePercentThreshold:70
    }}
    contentOffset={{x:70}}
    />
  )
} 
export default Trending

const styles = StyleSheet.create({})