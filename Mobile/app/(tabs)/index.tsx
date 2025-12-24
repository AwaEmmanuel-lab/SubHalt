import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'
import LinearGradient from "expo-linear-gradient"
import useAuthStore from '@/hooks/provider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const index = () => {

  const {listofallsubscription, user, allsub} = useAuthStore() 
  const[asynctoken, setasynctoken] = useState("")

  const gettoken = async() => {
      const value = await AsyncStorage.getItem("token")

      if(value){
        setasynctoken(value)
      }
      
    }

  useEffect(() => {
  gettoken()
}, [])

useEffect(() => {
  if (asynctoken) {
    allsub(asynctoken)
  }
}, [asynctoken])

  const Listitem = ({item}:{item: any}) => {
    
  }




  return (
    <View style = {styles.container}>
      <View style = {styles.headercontainer}>
        <View style = {styles.headerimagecontainer}>
          <Image
            source={require("@/assets/images/subhalt logo.png")} resizeMode= "contain" style ={{
              width:50,
              height: 50
            }}
          />
          <View style = {{ flexDirection: "row"}}>
          <Text style = {{fontSize: 48, paddingTop: 0}}>S</Text>
          <Text style = {{fontSize: 24, paddingTop: 21, fontWeight: "bold"}}>ubHalt</Text>
          </View>
        </View>
        <View style = {styles.containerforheadericon}>
          <TouchableOpacity>
            <Ionicons name= "log-out-outline" size={20} style = {{padding:4}}/>
          </TouchableOpacity>

        </View>
      </View>

      
      
      

      <View style = {styles.dashboard}>
        <View>
          <View style = {{paddingBottom:4}}>
            <Text style = {styles.dashbordnametext}> Hi👋, Awa</Text>
          </View>
          <View>
            <Text style = {{fontStyle: "italic", color:"white"}}>
              Never lose track 
            </Text>
            <Text style = {{fontStyle: "italic", color:"white"}}>of what you’re paying for.</Text>
          </View>
        </View>



        <View style = {{ paddingTop: 25, alignSelf: "flex-start"}}>
          <Text style = {{fontSize: 18, fontWeight: "bold", color:"white"}}>
            Total Subscription fee:
          </Text>
          <View style = {{flexDirection: "row", paddingTop:8}}>
            <Text style = {{fontSize: 25, fontWeight: "bold", color:"white"}}>$0</Text>
            <View style = {{alignSelf: "flex-end"}}>
              <TouchableOpacity>
                <Ionicons name = "eye-outline" size={20} color= "white" style = {{padding: 4}}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>




      <View>
        <FlatList
          data={listofallsubscription}
          keyExtractor={(Item) => Item._id}
          renderItem={({item}) => (
            <View>
              <View style = {{flexDirection: "row", justifyContent: "space-between", padding: 4}}>
                <View>
                  <Text>
                    {item.name}
                  </Text>
                </View>
                <View></View>
              </View>
            </View>
          )}
        />
      </View>
      
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#effcebff"
  },
  headercontainer:{
    flexDirection: "row",
    justifyContent:"space-between",
    // borderWidth: 1,
    backgroundColor: "white",
    // marginHorizontal: 4,
    // borderRadius: 15,
    // marginVertical: 4
    marginBottom: 8
  },
  headerimagecontainer:{
    flexDirection: "row",
    //borderWidth:1,
    padding:4
  },
  containerforheadericon:{
    padding: 16
  },
  dashboard:{
    borderWidth: 1,
    marginHorizontal:4,
    backgroundImage:"",
    padding:4,
    borderRadius:15,
    shadowColor: "#000",
    shadowOffset: {width:4,height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    //flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#d4d3d3ff",
    backgroundColor:"#99be8aff"
  },
  dashbordnametext:{
    fontSize:24,
    fontWeight: "bold",
    color:"white"
  }
})