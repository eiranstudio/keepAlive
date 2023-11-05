const express = require('express')
const app = express()
const port = 3000

const cron = require("cron")
const axios = require("axios").default

const backendUrl = process.env.BACKEND_URL;
const agent = axios.create({
    baseURL: backendUrl,
})

const job = new cron.CronJob('*/10 * * * *', function () {
    // function function will be executed every 14 minutes.
    console.log("Restarting server");
    // Perform an HTTPS GET request to hit any backend api.
    agent.get('/').then((Response) => {
        if (Response.status == 200) {
            console.log(`Server restarted: ${Response.status}`);
        } else {
            console.log(`Failed to restart server with status code: ${Response.status}`)
        }
    }).catch((err) => {
        console.log('Error during Restart: ', err.message)
    })
});

job.start()

app.get('/', (req, res) => {
    console.log('Hello Eiran! restarting crone job server');
    res.send(true);
})

app.listen(port, () => {
    console.log(`Hello Eiran, iam listening on port: ${port}`)
})