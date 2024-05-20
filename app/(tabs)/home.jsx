import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
const Home = () => {
  const {data:posts,refetch}=useAppwrite(getAllPosts); // rename data as posts
  const {data:latestPosts}=useAppwrite(getLatestPosts); // rename data as latestPosts
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh=async()=>{
        setRefreshing(true);
        // recall to any new videos appears
        refetch();
        setRefreshing(false)
  }
  return (  
    <SafeAreaView backgroundColor="#161622" style={{flex:1}}>
      <FlatList
        data={posts}
        keyExtractor={(item)=>item.$id}
        renderItem={
          ({item})=>(
          <VideoCard video={item}/>
          )}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    JSMastery
                  </Text>
                </View>
  
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput />
  
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-lg font-pregular text-gray-100 mb-3"> 
                  Latest Videos
                </Text>

                <Trending posts={latestPosts ?? []}/>
  
                <Trending posts={ null ?? []} />
              </View>
            </View>
          )}
              ListEmptyComponent={()=>(
                <EmptyState
                    title="No Videos Found"
                    subTitle="Be the first one to upload a video"
                />
              )}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
              />
              
    </SafeAreaView>
  )
}
export default Home
