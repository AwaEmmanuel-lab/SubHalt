import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, Alert, Linking, ActivityIndicatorBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'
import LinearGradient from "expo-linear-gradient"
import useAuthStore from '@/hooks/provider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect,  useRouter, useSegments } from 'expo-router'
import Editepage from "@/app/Editepage"
import { registerForPushNotifications } from "@/utils/registerForPushNotifications"
import { ActivityIndicator } from 'react-native-paper'





const index = () => {

  const { listofallsubscription, user, allsub, logoutUser, loading, deletesub, sendnotification } = useAuthStore()
  const [asynctoken, setasynctoken] = useState("")
  const [seetotalsubfee, setseetotalsubfee] = useState(false)
  const [urlloading, seturlloading] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const router = useRouter()

  const segments = useSegments()


  const toggleseetotalsubfee = () => {
    setseetotalsubfee(!seetotalsubfee)
  }

  const gettoken = async () => {
    const value = await AsyncStorage.getItem("token")

    if (value) {
      setasynctoken(value)
    }

  }

  const getsubfee = () => {

    let total = 0

    for (const item of listofallsubscription) {
      total += item.amount
    }

    return total
  }




  useEffect(() => {
    gettoken()
  }, [])

  useEffect(() => {
    registerForPushNotifications(asynctoken)
  }, [asynctoken])

  useEffect(() => {

    if (asynctoken) {
      allsub(asynctoken)
    }
  }, [asynctoken])



  const dateconversion = (subscription: any) => {
    const date = new Date(subscription)

    const options = {
      timeZone: 'UTC',     // <--- This is the crucial part
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    // This will now show the UTC date regardless of where the user is
    console.log(date.toLocaleDateString('en-US',));
    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',     // <--- This is the crucial part
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }


  const milliseccoversion = (subscription: any) => {
    const date = new Date(subscription)

    const time = date.getTime()

    console.log(time)
    return time
  }


  const getDaysRemaining = (subscriptionDate: string): number => {


    const now = new Date();
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const expiry = new Date(subscriptionDate);
    const expiryUTC = Date.UTC(expiry.getUTCFullYear(), expiry.getUTCMonth(), expiry.getUTCDate());
    const diffInMs = expiryUTC - todayUTC;
    const daysLeft = Math.floor(diffInMs / 86400000);

    return daysLeft;
  };


  const openwebsite = async (url: string) => {

    seturlloading(true)
    try {
      const formaturl = url.startsWith("http") ? url : `https://${url}`;

      const supported = await Linking.canOpenURL(formaturl)

      if (!supported) {
        Alert.alert("Can't open Url", "This url is not supported")
        seturlloading(false)
      }

      await Linking.openURL(formaturl);
      seturlloading(false)
    } catch (error) {
      Alert.alert("Error", "Failed to open website");
      console.log(error);
    } finally {
      seturlloading(false);
    }
  }


const onrefresh = async () => {
  setrefresh(true)
  gettoken() 
  await allsub(asynctoken)
  setrefresh(false)
}

const intabsgroup = segments[0] === "(tabs)"





const ICONSIZE = 20
const TROPHYCOLOR = "#FFD700"
const DOLLARCOLOR = "#85BB65"



return (
  <View style={styles.container}>
    <View style={styles.headercontainer}>
      <View style={styles.headerimagecontainer}>
        <Image
          source={require("@/assets/images/subhalt logo.png")} resizeMode="contain" style={{
            width: 50,
            height: 50
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 48, paddingTop: 0 }}>S</Text>
          <Text style={{ fontSize: 24, paddingTop: 21, fontWeight: "bold" }}>ubHalt</Text>
        </View>
      </View>
      <View style={styles.containerforheadericon}>
        <TouchableOpacity onPress={async() => { 
          await logoutUser()
          
          router.replace("/(auth)")
         }}>
          {loading ?
            <ActivityIndicator size="small" color="#99be8aff" />
            :
            <Ionicons name="log-out-outline" size={20} style={{ padding: 4 }} />
          }

        </TouchableOpacity>

      </View>
    </View>





    <View style={styles.dashboard}>

      <View>
        <View>
          <View style={{ paddingBottom: 4 }}>
            <Text style={styles.dashbordnametext}> Hi👋, {user.username}</Text>
          </View>
          <View>
            <Text style={{ fontStyle: "italic", color: "white" }}>
              Never lose track
            </Text>
            <Text style={{ fontStyle: "italic", color: "white" }}>of what you’re paying for.</Text>
          </View>
        </View>



        <View style={{ paddingTop: 16, alignSelf: "flex-start" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Total Subscription fee:
          </Text>

          {seetotalsubfee ? <View style={{ flexDirection: "row", paddingTop: 8 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>{getsubfee()}</Text>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity onPress={() => {
                toggleseetotalsubfee()
              }}>
                <Ionicons name="eye-outline" size={20} color="white" style={{ padding: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
            :
            <View style={{ flexDirection: "row", paddingTop: 8 }}>
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>****</Text>
              <View style={{ alignSelf: "flex-end" }}>
                <TouchableOpacity onPress={() => {
                  toggleseetotalsubfee()
                }}>
                  <Ionicons name="eye-off-outline" size={20} color="white" style={{ padding: 4 }} />
                </TouchableOpacity>
              </View>
            </View>
          }

        </View>
      </View>

      <Image source={require("../../assets/images/picforunsubscribedashboard-removebg-preview.png")}
        resizeMode="contain" style={{ width: 200, height: 150 }}
      />

    </View>

    {/* <View style= {{ flexDirection: "row",flex:1, justifyContent: "space-between"}}>
        <View style= {{padding:4}}>
          <Text style = {{fontWeight: "bold"}}>
            Subscriptions
          </Text>
        </View>
        <View>
          <Text>
            No of Sub: 3
          </Text>
        </View>
      </View> */}

    {
      loading && listofallsubscription.length === 0 || !listofallsubscription?
        <ActivityIndicator size="large" color="#99be8aff" style={{ marginTop: 32 }} />
        :
        <FlatList
          data={listofallsubscription}
          keyExtractor={(Item) => Item._id}
          style={{ marginTop: 24 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (

            <View style = {{flex: 1, justifyContent: "center", paddingTop: 48, alignContent: "center", alignItems: "center", alignSelf: "stretch"}}>
              <Ionicons name= "document-outline" size= {48}/>
              <Text style ={{fontSize: 24, fontWeight: "bold"}}>No document</Text>
            </View>

          )           
          }
          refreshing = {refresh}
          onRefresh={onrefresh}
          renderItem={({ item }) => (
            <View style={{ margin: 4, borderRadius: 15, backgroundColor: "white", elevation: 8 }}>
              <View style={styles.listitem}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>

                  <View style={styles.constainerforheaderinlistitem}>
                    <View style={{ padding: 2 }}>
                      <Ionicons name="trophy" size={ICONSIZE} color={TROPHYCOLOR} />
                    </View>
                    <View>
                      <Text style={[styles.textconstainerforheaderinlistitem, { fontWeight: "bold" }]}>
                        {item.name}
                      </Text>
                    </View>
                  </View>



                  <View style={styles.constainerforheaderinlistitem}>
                    <View style={{ padding: 2 }}>
                      <Ionicons name="cash-outline" size={ICONSIZE} color={DOLLARCOLOR} />
                    </View>
                    <View>
                      <Text style={[styles.textconstainerforheaderinlistitem, {fontWeight: "bold"}]}>
                        {item.amount}
                      </Text>
                    </View>
                  </View>



                  <View style={styles.constainerforheaderinlistitem}>
                    <View style={{ padding: 2 }}>
                      <TouchableOpacity onPress={() => {
                        router.push({
                          pathname: "/Editepage",
                          params: {
                            id: item._id,
                          },
                        })
                      }}>
                        <Ionicons name="pencil-outline" size={ICONSIZE} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ padding: 2 }}>
                      <TouchableOpacity onPress={() => {
                        Alert.alert("Delete Item", "Are you sure you want to delete this item", [{
                          text: "Discard",
                          onPress: () => {
                            console.log("cancel pressed")
                          },
                          style: "cancel"
                        }, {
                          text: "Delete",
                          onPress: () => {
                            deletesub(asynctoken, item._id)
                          },
                          style: "destructive"
                        }])
                      }}>
                        <Ionicons name="trash-outline" size={ICONSIZE} />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>

              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 8 }}>


                <View>
                  <View>
                    <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>
                      Start
                    </Text>
                  </View>
                  <Text style={{ color: "#4CAF50" }}>
                    {dateconversion(item.startDate)}
                  </Text>
                </View>


                <View>
                  <View>
                    <Text style={{ color: "#FF0000", fontWeight: "bold" }}>
                      Ends
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#FF0000" }}>
                      {dateconversion(item.endDate)}
                    </Text>
                  </View>
                </View>


                <View>
                  <View>

                    {
                      getDaysRemaining(item.endDate) <= 1 ?
                        <Text style={{ color: "#FF0000" }}>Expires in: {getDaysRemaining(item.endDate)}day</Text>
                        : getDaysRemaining(item.endDate) <= 2 ?
                          <Text style={{ color: "#FF0000" }}>Expires in: {getDaysRemaining(item.endDate)}days</Text>
                          : <Text style={{ color: "#4CAF50" }}>Expires in: {getDaysRemaining(item.endDate)}days</Text>
                    }
                  </View>
                  <View style={{}}>
                    <TouchableOpacity style={styles.cancelsubbtn} onPress={() => {
                      openwebsite(item.url)
                    }}>

                    {urlloading? 
                      <ActivityIndicator size="small" color= "white"/>
                    :
                      <Text style={{ color: "white", fontWeight: "bold" }}>Cancel subscription</Text>
                    }
                    </TouchableOpacity>
                  </View>
                </View>


              </View>
            </View>
          )}
        />
    }



  </View>
)

}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#effcebff"
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    backgroundColor: "white",
    // marginHorizontal: 4,
    // borderRadius: 15,
    // marginVertical: 4
    marginBottom: 8
  },
  headerimagecontainer: {
    flexDirection: "row",
    //borderWidth:1,
    padding: 4
  },
  containerforheadericon: {
    padding: 16
  },
  dashboard: {
    borderWidth: 1,
    marginHorizontal: 4,
    backgroundImage: "",
    padding: 4,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    //flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#d4d3d3ff",
    backgroundColor: "#99be8aff",
    flexDirection: "row"
  },
  dashbordnametext: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
  listitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    //borderWidth: 1,
    marginBottom: 16,
    // backgroundColor: "white"
  },
  constainerforheaderinlistitem: {
    flexDirection: "row",
    padding: 4
  },
  textconstainerforheaderinlistitem: {
    fontSize: 20
  },
  cancelsubbtn: {
    backgroundColor: "#99be8aff",
    padding: 4,
    borderRadius: 15
  }
})