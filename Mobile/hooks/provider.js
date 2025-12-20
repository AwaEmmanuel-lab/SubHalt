import {create} from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';


const useAuthStore = create((set) => ({
    user:null,
    token :null,
    loading: false,
    usermessage:null,

    updatesubmsg:null,
    sub:null,
    listofallsubscription:[],
    createsubmsg:null,
    deletesubmsg:null,

    signupuser: async (Username,email,password) =>{
        set({loading: true})
        try {
            const response = await fetch("https://subhalt-2.onrender.com/api/auth/signup", {
                method: "POST",
                headers:{
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    username:Username,
                    email:email,
                    password: password
                })
                
            })
            
            const data = await response.json()

            if(!response.ok){
                throw new Error("Error signing up");
                
            }

            set({user:data.user, token:data.token })
            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", JSON.stringify(data.token))
            set({loading: false})
        } catch (error) {
            console.log("Error get user and token while signing up")
            set({loading: false, usermessage: "Error get user and token while signing up"})

        }finally{
            set({loading: false})
        }
        
    },

    login: async (email, password) => {
        try {
            set({loading: true, usermessage: null})

            const response = await fetch("https://subhalt-2.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error("login failed")
            }

            set({
                user:data.user,
                token :data.token,
                loading: false
            })
            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", JSON.stringify(data.token))
        } catch (error) {
            set({loading: false})
            console.log("Login Error")
            set({usermessage: "Login Error"})
        }
    },

    logoutUser: async () => {
        set({loading:true})
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token");
            set({loading: false})
        } catch (error) {
            console.log("error while loginOut")
            set({loading: false})
        }

    },

    checkauth: async () => {
        try {
            set({loading:true, usermessage: null})
            const userinstring = await AsyncStorage.getItem("user")
            const token = await AsyncStorage.getItem("token")

            if(!userinstring || !token){
                set({
                    user:null,
                    token :null,
                    loading: false,
                })
            }

            const user = JSON.parse(userinstring)

            set({user: user, token:token, loading: false})
        } catch (error) {
            console.log("error checking auth")
            set({loading:false, usermessage: "error checking auth"})
        }
    },

    updatesub: async (id, token, name, url, startDate, endDate, amount) => {
        set({loading:true, updatesubmsg: null})
        try {
            
            const response = await fetch(`https://subhalt-2.onrender.com/updatesub/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    url,
                    startDate,
                    endDate,
                    amount
                })
            })

            const data = await response.json()
            
            if(!response.ok){
                throw new Error (data.message || "Couldn't update subscription")
            }

            set({
                updatesubmsg: data.message,
                sub:data.sub,
                loading: false
            })
            
        } catch (error) {
            console.log("Error updating Sbscription")
            set({loading: false, updatesubmsg: error.message})
        }
    },

    allsub: async() => {
        set({loading: true, updatesubmsg: null})
        try {
            const response = await fetch("https://subhalt-2.onrender.com/api/subscription/getsub")
            
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "failed to send subscription")
            }

            set({loading:false, listofallsubscription: data.sub})

        } catch (error) {
            console.log("error: ",error.message)
            set({loading: false, updatesubmsg: error.message})
        }
    },

    createsub:async (token, name, url, startDate, endDate, amount) => {
        set({loading: true, updatesubmsg: null})
        try {
            const response = await fetch("https://subhalt-2.onrender.com/api/subscription/fillsub",{
                method: "POST",
                headers:{
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    name,
                    url,
                    startDate,
                    endDate,
                    amount
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "failed creating subscription")
            }


            set({
                sub: data.sub,
                loading: false,
                updatesubmsg: data.message
            })
        } catch (error) {
            console.log("error creatin subscription ", error.message)
            set({
                loading: false,
                updatesubmsg: error.message
            })
        }
    },
    deletesub:async (token, id) => {
        set({loading:true, updatesubmsg: null})
        try {
            const response = await fetch(`https://subhalt-2.onrender.com/api/subscription/deletesub/${id}`, {
                method: "DELETE",
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message ||"Failed To delete message")
            }

            set({
                loading: false,
                updatesubmsg: data.message
            })
        } catch (error) {
            console.log("Erro deleting message", error.message)
            set({loading: false, updatesubmsg: error.message})
        }
    }

}))

export default useAuthStore