//import Safeareaview from "@/components/Safeareaview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Stack, useSegments } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper'
import { useEffect, useState } from "react";
import useAuthStore from "../hooks/provider.js";

export default function RootLayout() {

  // const[isuser, setisuser] = useState({})
  // const[istoken, setistoken] = useState("")
  const segments = useSegments()
  
  const {
  user,
  token,
  checkauth,
  loading,
} = useAuthStore()

  useEffect(() => {
    checkauth()
  }, [])

    // if(loading){
    //   return null
    // }
    const inAuthGroup = segments[0] === "(auth)"

  
  
if (!user && !inAuthGroup) {
    return <Redirect href ="/(auth)" />
  }

  if (user && inAuthGroup) {
    return <Redirect href ="/(tabs)" />
  }

  

      return   <SafeAreaProvider>
    <SafeAreaView style = {{flex: 1}}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)" options={{headerShown:false}}/>
        <Stack.Screen name="(tab)" options={{headerShown:false}}/>
      </Stack>
      </SafeAreaView>
      </SafeAreaProvider>
}
