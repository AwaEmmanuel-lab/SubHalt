const sendNotification =async (pushToken, title, body, navdata = {}) => {

        try {
            
            const response = await fetch("https://exp.host/--/api/v2/push/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    to: pushToken,
                    sound: "default",
                    title,
                    body,
                    navdata
                })
            })

            const data = response.json()

            if(!response.ok){
                throw new Error(data.message || "Something went wrong when sending notification");
            }
            console.log(data)
            
        } catch (error) {
            console.log("Error when sending notification: " + error.message)
        }
    }


    export default sendNotification