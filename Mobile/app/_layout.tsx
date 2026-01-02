//import Safeareaview from "@/components/Safeareaview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Stack, useRouter, useSegments } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper'
import { use, useEffect, useState } from "react";
import useAuthStore from "../hooks/provider.js";
import * as Notifications from "expo-notifications"
import AsyncStorage from "@react-native-async-storage/async-storage";




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});



export default function RootLayout() {

  const router = useRouter();


  Notifications.addNotificationResponseReceivedListener(response => {
    const userInfo = response.notification.request.content.data;
    console.log("Notification Received: ", userInfo);

    if (userInfo?.screen === "subscription") {
      router.push(`/(tabs)`)
    }
  })
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
  const intabsgroup = segments[0] === "(tabs)"



  
  if (!user && !inAuthGroup) {
    return <Redirect href="/(auth)" />
  }

  if (user && inAuthGroup) {
    return <Redirect href="/(tabs)" />
  }

  
  

  

  



  return <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  </SafeAreaProvider>
}
