import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from '../../components/EmptyState'
import VideoCard from "../../components/VideoCard";
import { getUserPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Profile = () => {
const { setIsLogged,user,setUser} =useGlobalContext();
console.log(user.$id);
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

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
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {/* {query} */}
              </Text>

              <View className="mt-6 mb-8">
                {/* <SearchInput initialQuery={query} refetch={refetch} /> */}
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;