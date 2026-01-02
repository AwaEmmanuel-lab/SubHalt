import cron, { CronJob } from "cron"
import Subscription from "../Models/subscription.model.js"
import sendNotification from "./sendNotification.js"

const getDaysRemaining = (subscriptionDate) => {


  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const expiry = new Date(subscriptionDate);
  const expiryUTC = Date.UTC(expiry.getUTCFullYear(), expiry.getUTCMonth(), expiry.getUTCDate());
  const diffInMs = expiryUTC - todayUTC;
  const daysLeft = Math.floor(diffInMs / 86400000);

  return daysLeft;
};

const job2 = new CronJob("0 0 0 * * *", async() => {


    try {
        
        const subs = await Subscription.find().populate("user", "pushToken")

    for (const sub of subs) {
        const daysLeft = getDaysRemaining(sub.endDate)

        if (daysLeft === 3 || daysLeft === 2 ||daysLeft === 1 ||daysLeft === 0 && sub.user.pushToken) {
            await sendNotification(
                sub.user.pushToken,
                "Subscription Expiring ⏳",
                `${sub.name} is about to expire in ${daysLeft} day(s).`,
            {
                screen: "subscription",
                subscriptionId: sub._id
        }
      )
    }
  }

    } catch (error) {
        console.log("Cannot send notification")
    }
})

job2.start()