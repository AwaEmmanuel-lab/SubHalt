import {create} from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';


const provder = create((set) => {
    user:null
    token:null

    signupuser: async (Username,email,password) =>{
        try {
            const response = await fetch("http://localhost:5001/api/auth/signup", {
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
        return data
        } catch (error) {
            
        }
        
    }
    
})