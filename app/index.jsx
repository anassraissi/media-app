import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {

  const { loading, isLogged,user } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  console.log('isLogged',isLogged);
  return (
    <SafeAreaView className="bg-gray-900 h-full" >
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className=" w-full justify-center items-center  min-h-[85vh] px-4" style={{justifyContent:'flex-start',marginTop:13}}>
          <Image source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode="contain"
          />
          <Image source={images.cards}
          className=" max-w-[380px]  w-full h-[300px]"
          resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text> 
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}
