import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"
import React, { useEffect, useState } from 'react'
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'
import { Ionicons } from '@expo/vector-icons'
import useAuthStore from '@/hooks/provider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, useRouter } from 'expo-router'
import { useLocalSearchParams } from "expo-router"
//import { TextInput } from 'react-native-paper'




const Editepage = () => {


  const { id } = useLocalSearchParams<{ id: string }>()

  const {token, user, updatesub, updatesubmsg,sub, loading, checkauth} = useAuthStore()

  const route = useRouter()
  

  const [startdate, setstartdate] = useState(new Date())
  const [startshow, setstartShow] = useState(false)
  const [enddate, setenddate] = useState(new Date())
  const [endshow, setendshow] = useState(false)

  const [name, setname] = useState("")
  const [Url, setUrl] = useState("")
  const [amount, setamount] = useState("")
  const[asynctoken, setasynctoken] = useState("")

  

    const gettoken = async() => {
      const value = await AsyncStorage.getItem("token")

      if(value){
        setasynctoken(value)
      }
      
    }

    useEffect(() => {
      checkauth()
      gettoken()
    },[])

  const onchangeforstart = (event: any, selecteddate: any) => {

    setstartShow(false)
    if(selecteddate){
      setstartdate(selecteddate)
    }
  }

  const onchangeforend = (event: any, selecteddate: any) => {
    setendshow(false)

    if(selecteddate){
      setenddate(selecteddate)
    }
  }


  const handlesavebtn = () => {

    const numericamount = parseInt(amount)
    
    updatesub( id, asynctoken, name, Url, startdate, enddate, numericamount)

  }



  return (
    <View style = {styles.container}>
      {/* Top text */}
      <View style = {styles.containerforheader}>
        <View style = {{padding:16}}>
          {/* <Image source={require("@/assets/images/subhalt logo.png")} resizeMode= "contain" style = {{
            width:50,
            height: 50
          }}/> */}
          <TouchableOpacity onPress={() => {
            route.back()
          }}>
            <Ionicons name = "arrow-back-outline" size={20}/>
          </TouchableOpacity>
        </View>

        <View>
          <Text style = {{fontSize:18, padding: 16}}>Update Subscription</Text>
        </View>
        
        {loading?
          <ActivityIndicator color={"black"} size= {20} style = {{padding: 16}}/>
          
        :
        <View>
          <TouchableOpacity onPress={()=>{
            handlesavebtn()

            setname("")
            setUrl("")
            setamount("")
          }} >
            <Ionicons name = "save-outline" size= {18} style = {{padding: 16}}/>
          </TouchableOpacity>
        </View>
        }

        

      </View>


      <View style = {styles.cardcontainer}>
        <View style = {styles.containerfortextinput}>
          <Ionicons name = "trophy-outline" size={18} style = {{padding: 10}}/>
          {/* <Text style = {{padding: 9}}>Name</Text> */}
          <TextInput
            style = {styles.textinput}
            placeholder='Name of Subscription'
            value={name}
            onChangeText={(text) => {
              setname(text)
            }}
          />
        </View>
        <View style = {styles.containerfortextinput}>
          {/* <Text>Url</Text> */}
          <Ionicons name = "link-outline" size={18} style = {{padding: 10}}/>
          <TextInput
            style = {styles.textinput}
            placeholder='Url of the website'
            value= {Url}
            onChangeText={(text) => {
              setUrl(text)
            }}
            autoCapitalize= "none"
          />
        </View>
        <View  style = {styles.containerfortextinput}>
          <Ionicons name = "cash-outline" size={18} style = {{padding: 10}}/>
          <TextInput
            style = {styles.textinput}
            placeholder='Amount e.g $7'
            value = {amount}
            onChangeText={(text) => {
              setamount(text)
            }}
            keyboardType= "number-pad"
          />
        </View>
        <View style = {styles.containerforbutton}>
          <View>
              <TouchableOpacity style = {styles.datebutton} onPress={() => {
                setstartShow(true)
              }}>
              <Text>
                Starting Date
              </Text>
            </TouchableOpacity>
          </View>
          <View>
              <TouchableOpacity style = {styles.datebutton} onPress={() => {
                setendshow(true)
              }}>
              <Text>
                Ending date
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {startshow && 
          <DateTimePicker
          value={startdate}
          mode="date"
          display="default"
          onChange={onchangeforstart}
          />
        }

        {endshow && 
          <DateTimePicker
          value={enddate}
          mode="date"
          display="default"
          onChange={onchangeforend}
          />
        }
      </View>
    </View>
  )
}

export default Editepage


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#effcebff"
  },
  containerforheader:{
    alignContent: "space-between",
    justifyContent: "space-between",
    alignSelf: "stretch",
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomColor: "#99be8aff",
    borderWidth: 1,
    borderTopColor: "white",
    borderStartColor: "white",
    borderEndColor: "white"
  },
  cardcontainer:{
    borderWidth: 1,
    margin: 8,
    padding: 8,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset:{width:3,height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    borderColor: "#99be8aff",
    backgroundColor: "white"
  },
  containerfortextinput:{
    flexDirection: "row",
    borderWidth:1,
    borderRadius:15,
    backgroundColor:"#99be8aff",
    borderColor:"#70707094",
    marginBottom:16
  },
  textinput:{
    //borderWidth:1,
    borderRadius:15,
    flex: 1,
    backgroundColor:"white",
    padding:8
  },
  datebutton:{
    borderWidth:1,
    padding:8,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset:{width:3,height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    borderColor: "#d4d3d3ff",
    backgroundColor:"#99be8aff",
    //elevation:4
  },
  containerforbutton:{
    flexDirection: "row",
    //borderWidth:1,
    justifyContent:"space-around",
    paddingBottom:16
  }
})