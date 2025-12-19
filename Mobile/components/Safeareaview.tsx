import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context'

const Safeareaview = ({children}:{children:React.ReactNode}) => {
    const insects = useSafeAreaInsets()
  return (
    <View style = {{paddingTop: insects.top, paddingBottom:insects.bottom}}>
      {children}
    </View>
  )
}

export default Safeareaview