import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AnimatedFAB } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs screenOptions={{
        headerShown: false, 
        tabBarStyle:{
            position: "absolute",
            bottom :20,
            height: 44,
            left: 16,
            right: 16,
            // marginStart:20,
            // marginEnd:20,
            alignSelf:"center",
            marginHorizontal: 26,
            alignContent: "center",
            // width:"90%",
            borderRadius: 20,
            backgroundColor: "white",
            borderColor: "#99be8aff"
        }
    }}>
        <Tabs.Screen name='index' options={{
            title: "Home",
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home-outline" color={"#99be8aff"} size={20}/>
            )
        }}/>

        <Tabs.Screen name='Createsub' options={{
            title: "profile",
            tabBarIcon: ({color, size}) => (
                <Ionicons name="create-outline" color={"#99be8aff"} size={20}/>
            )
        }}/>

        <Tabs.Screen name='Profile' options={{
            title: "Profile",
            tabBarIcon: ({color, size}) => (
                <Ionicons name= "person-outline" color={"#99be8aff"} size={20}/>
            )
        }}/>
    </Tabs>
  )
}

export default _layout