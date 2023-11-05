// Cron job to hit endpoint every 14 sec to keep backend alive always const cron = require('cron');
import cron from "cron";
import axios from "axios";

const backendUrl = process.env.BACKEND_URL;
const agent = axios.create({
    baseURL: backendUrl,
})

const job = new cron.CronJob('*/14 * * * *', function () {
    // This function will be executed every 14 minutes.
    console.log("Restarting server");
    // Perform an HTTPS GET request to hit any backend api.
    agent.get('/').then((Response)=>{
        if(Response.status == 200){
            console.log(`Server restarted: ${Response.status}`);
        }else{
            console.log(`Failed to restart server with status code: ${Response.status}`)
        }
    }).catch((err)=>{
        console.log('Error during Restart: ', err.message)
    })
});
// Export the cron job.
export default job;