import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    
    <>
        {/* <StatusBar backgroundColor="#161622" barStyle="light-content" /> */}
      <Stack>
        <Stack.Screen name="sign-in" options={{headerShown:false}}/>
        <Stack.Screen name="sign-up" options={{headerShown:false}}/>
      </Stack>  
    </>
  )
}
export default AuthLayout

