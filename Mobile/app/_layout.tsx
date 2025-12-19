//import Safeareaview from "@/components/Safeareaview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper'

export default function RootLayout() {
      return   <SafeAreaProvider>
    <SafeAreaView style = {{flex: 1}}>
      <Stack>
        <Stack.Screen name="(auth)" options={{headerShown:false}}/>
      </Stack>
      </SafeAreaView>
      </SafeAreaProvider>
}
