//import Safeareaview from "@/components/Safeareaview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useSegments } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper'
import provider from "../hooks/provider.js"
import { useEffect, useState } from "react";

export default function RootLayout() {

  const[isuser, setisuser] = useState({})
  const[istoken, setistoken] = useState("")
  const [segment] = useSegments()

  const {user, token,checkauth} = provider()

  useEffect(() => {
    checkauth()
  }, [])

    setisuser(user)
    setistoken(token)
    if(isuser && istoken && segment[0] === "(auth)"){
      <Link href = {"/(tabs)/Createsub"} />
    }

  

      return   <SafeAreaProvider>
    <SafeAreaView style = {{flex: 1}}>
      <Stack>
        <Stack.Screen name="(auth)" options={{headerShown:false}}/>
      </Stack>
      </SafeAreaView>
      </SafeAreaProvider>
}
