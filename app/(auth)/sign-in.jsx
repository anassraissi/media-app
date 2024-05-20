import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const SingIn = () => {
  const { setUser, setIsLogged} = useGlobalContext();
  const [form, setForm] = useState({
    email:'',
    password:''
  })  
  const submit=async()=>{ 
    if(form.email==="" || form.password===""){
      Alert.alert('Error',"Please fill all fields")
    }
    setIsSubmiting(true)
    try {
          await signIn(form.email,form.password);
          const result=await getCurrentUser();
          setUser(result);
          setIsLogged(true)
          Alert.alert("success","User signed in successfully")
          router.replace('/home');
    } catch (error) {
        Alert.alert('Error',error.message)
    }
    finally{
      setIsSubmiting(false)
    }
  }
  const [isSubmiting, setIsSubmiting] = useState(false)
  return (
    <SafeAreaView className="bg-gray-900 h-full" >
        <ScrollView>
              <View className="w-full justify-center h-full px-4 my-6">
              <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
           <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email:  e })}
/* Here, the spread operator (...form) ensures that all existing properties of the form object
 are preserved, while only the email property is updated with the new value.*/
            otherStyles="mt-7"
            keyboardType="email-address"
          /> 
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmiting}
            />
            <View className=" justify-center pt-5 flex-row gap-2">
                <Text className=' text-lg text-gray-100 font-regular'>
                    Don't have account ?
                </Text>
                <Link href='/sign-up' className=' text-lg font-semibold text-orange-500'>Sign Up</Link>
            </View>
              </View>
        </ScrollView>
      </SafeAreaView>
  )
}

export default SingIn

const styles = StyleSheet.create({})