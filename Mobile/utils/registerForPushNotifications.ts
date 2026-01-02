import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import { Platform } from "react-native"
import Constants from "expo-constants"


export async function registerForPushNotifications(token: String) {
  if (!Device.isDevice) {
    alert("Must use physical device for push notifications")
    return null
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync()

  let finalStatus = existingStatus

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== "granted") {
    alert("Permission not granted")
    return null
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId

  const tokenData = await Notifications.getExpoPushTokenAsync()

  const pushToken = tokenData.data

  try {
    await fetch("https://subhalt-2.onrender.com/api/savetoken", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pushToken })
  })
  } catch (error) {
    console.log("error saving token. Error: " + error)
  }
}
