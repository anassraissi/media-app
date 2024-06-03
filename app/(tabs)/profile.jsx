import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from '../../components/EmptyState'
import VideoCard from "../../components/VideoCard";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";
import { icons } from "../../constants";
const Profile = () => {
const { setIsLogged,user,setUser} =useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
const logout=async()=>{
      await signOut();
      setUser(null);
      setIsLogged(false)
      router.replace('/sign-in');
}
  return (
    <SafeAreaView className="bg-gray-900 h-full" >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
          title={item.title} 
          thumbnail={item.thumbnail}
          video={item.video}
           username={item.users.username}
            avatar={item.users.avatar} 
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />

              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}

      />
    </SafeAreaView>
  );
};

export default Profile;