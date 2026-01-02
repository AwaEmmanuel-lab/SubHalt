import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAuthStore from '@/hooks/provider'

const Profile = () => {

  const {user, listofallsubscription} = useAuthStore()

  const formatedDate = (date: string) => {

    const newDate = new Date(date)

    const newDateFormat = newDate.toLocaleDateString("en-US",{
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric"
    })

    return newDateFormat
  }

  return (
    
    
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      <View style = {styles.headerContainer}>
        <View>
          <Image source={require("@/assets/images/subhalt logo.png")} resizeMode="contain" style= {{width: 50, height: 50}}/>
        </View>
        <View style = {{padding: 8}}>
          <Text style = {styles.textInHeaderContainer}>Profile</Text>
        </View>
      </View>

      <View style = {styles.Imagecontainer}>
        <Image source={require("@/assets/images/subhalt logo.png")} resizeMode="contain" style= {{width: 200, height: 200}}/>
      </View>

      <View style = {{flex: 1, borderTopEndRadius: 15, borderTopStartRadius: 15, backgroundColor: "#effcebff", padding:4}}>
        <View style = {styles.holdingcontainer}>
        <View style = {{borderBottomWidth: 1, padding:4, borderBottomColor: "white", marginTop: 24}}>
          <Text style ={styles.Text}>Username: {user.username}</Text>
        </View>
        <View style = {{borderBottomWidth: 1, padding:4, borderBottomColor: "white", marginTop: 24}}>
          <Text style ={styles.Text}>Email: {user.email}</Text>
        </View>
        <View style = {{borderBottomWidth: 1, padding:4, borderBottomColor: "white", marginTop: 24}}>
          <Text style ={styles.Text}>Date joined: {formatedDate(user.createdAt)}</Text>
        </View>
        <View style = {{borderBottomWidth: 1, padding:4, borderBottomColor: "white", marginTop: 24}}>
          <Text style ={styles.Text}>Number of subscription: {listofallsubscription.length}</Text>
        </View>
      </View>
      </View>

    </ScrollView>
  )
}


export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection:"row",
  },
  textInHeaderContainer:{
    fontSize: 24,
    fontWeight:"bold"
  },
  holdingcontainer: {
    borderWidth: 1,
    padding: 8,
    marginStart: 8,
    marginEnd: 8,
    marginTop: 100,
    borderColor: "white",
    borderRadius:15,
    shadowColor: "black",
    shadowOffset:{width:3, height:3},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    backgroundColor: "#99be8aff"
  },
  Text:{
    fontSize:16,
    color: "white"
  },
  Imagecontainer: {
    alignItems: "center",
    //justifyContent: "center"
    //backgroundColor: "#99be8aff"
  }
})