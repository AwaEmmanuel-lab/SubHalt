import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity} from "react-native";
import * as React from "react"
import {Ionicons} from "@expo/vector-icons";
import { useState } from "react";
import { Link } from "expo-router";


export default function Index() {

  const [isActive, setisActive] = useState(false)
  const [seepassword, setseepassword] = useState(false)

  const toggleeyebutton = () => {
    setseepassword(!seepassword)
  }

  const styles = styles1(isActive)
  return (
    <View
      style={styles.container}
    >
      <Text style = {styles.upmosttext}>SubHalt</Text>
      <View style = {styles.cardviewContainer}>
        {/* for the header */}
        <View>
          <Text style = {styles.HeaderText}>Sign Up</Text>
        </View>
        {/* for the textinput form */}
        <View>
          <Text style = {{marginTop:8, fontSize:16}}>Username</Text>
          <View style = {styles.textinputviewcontainer}> 
            <View style = {{ padding: 8,}}>
              <Ionicons name= "person-outline" size = {24} color= "#99be8aff" style={{paddingTop: 10}}/>       
            </View>   
            <TextInput
            placeholder="Username"multiline = {false}
            underlineColorAndroid="transparent"
            style = {styles.textinput}
            onFocus={() => {
              setisActive(true)
            }}
            onBlur={() => {
              setisActive(false)
            }}
            />
          </View>
          <Text style = {{marginTop:8, fontSize:16}}>Email</Text>
          <View style = {styles.textinputviewcontainer}> 
            <View style = {{ padding: 8,}}>
              <Ionicons name= "mail-outline" size = {24} color= "#99be8aff" style={{paddingTop: 10}}/>       
            </View>   
            <TextInput
            placeholder="Email"
            multiline = {false}
            underlineColorAndroid="transparent"
            style = {styles.textinput}
            onFocus={() => {
              setisActive(true)
            }}
            onBlur={() => {
              setisActive(false)
            }}
            />
          </View>
          
          <Text style = {{marginTop:8, fontSize:16}}>Password</Text>
          <View style = {styles.textinputviewcontainer}> 
            <View style = {{ padding: 8,}}>
              <Ionicons 
              name= "key-outline"
              size = {24}
              color= "#99be8aff"
              style={{paddingTop: 10}
              
              }/>       
            </View>   
            <TextInput
            placeholder="Password"multiline = {false}
            underlineColorAndroid="transparent"
            style = {styles.textinput}
            secureTextEntry = {seepassword}
            />
            <View style = {{padding: 8,}}>
              <TouchableOpacity onPress={() => {
                toggleeyebutton()
              }}>
                {seepassword ?
                  <Ionicons name= "eye-off-outline" size = {24} style={{paddingTop: 10}}/> 
                  :
                  <Ionicons name= "eye-outline" size = {24} style={{paddingTop: 10}}/> 
                }
                      
              </TouchableOpacity>
            </View>   
          </View>
        </View>
        {/* FOR THE SUBMIT BUTTON */}
        <View style = {styles.containerforbutton}>
          <TouchableOpacity style = {styles.touchablebutton}>
            <Text style = {styles.textforbutton}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* FOR THE NAVIGATION TO LOGIN */}
        <View style ={{alignSelf: "stretch", alignItems: "center"}}>
          <Text>
            Already have an account?
            <Link href="/(auth)/Login">
              <Text style = {{color: "#99be8aff", paddingHorizontal: 4}}>
                 Login here
              </Text>
            </Link>
          </Text>
          
        </View>
      </View>
    </View>
  )
}

const styles1 = (isActive: any) => {

  const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "#d5e6cfff"
  },
  upmosttext:{
    paddingBottom:48,
    fontSize:42,
    fontFamily:"cursive"
  },
  cardviewContainer:{
    marginEnd:16,
    marginStart:16,
    alignSelf: "stretch",
    shadowColor: "black",
    shadowOffset:{width:3, height:3},
    shadowOpacity:0.5,
    shadowRadius:15,
    borderRadius:15,
    padding:16,
    backgroundColor: "white"
  },
  textinput:{
    alignSelf: "stretch",
    width:"100%",
    borderWidth:1,
    padding:13,
    borderRadius:15,
    borderColor: isActive? "white": "white",
    fontSize:16,
    marginTop:8,
    // ...(Platform.OS === "web"
    // ? {
    //     outlineStyle: "none",
    //     caretColor: "#2563EB",
    //   }
    // : {}),
  }
  ,
  textinputviewcontainer:{
    flexDirection:"row",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 8,
    paddingVertical:4,
    borderColor:"#d4d3d3ff",
    backgroundColor: "#ffffffff",
  },
  HeaderText:{
    fontSize:24,
    fontWeight: "bold",
    alignSelf: "center"
  },
  containerforbutton:{
    alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 16
  },
  touchablebutton:{
    padding: 8,
    borderWidth: 1,
    width:  "50%",
    alignItems: "center",
    borderRadius:50,
    borderColor: "#d4d3d3ff",
    backgroundColor:"#99be8aff"
  },
  textforbutton:{
    fontSize:16,
    color:"white"
  }
})

return styles;
}


