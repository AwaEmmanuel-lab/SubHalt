import { CronJob } from "cron";
import http from "http"

const job = new CronJob("0 */14 * * * *",
    () => {
        http.get("https://subhalt-2.onrender.com/api/subscription/getsub", (res) => {
            if(res.statusCode >= 200 && res.statusCode < 300){
                console.log("get request sent succesfully")
            }else{
                console.log("get request failed")
            }
        }).on("error", (err) => {
            console.error("HTTP request error:", err.message)
        })
    },
    null,
    false
)

export default job

