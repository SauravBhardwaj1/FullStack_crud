const express = require('express');
const {userRouter} = require('./routes/userRoute');
const { connection } = require('./config/db');
const { authRouter } = require('./routes/authRoute');
const { authValidator } = require('./middlewares/Authenticator');
require("dotenv").config()

const app = express();

app.use(express.json())
app.use(authValidator)

app.use("/product",userRouter)
app.use("/user",authRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to server")
    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
    console.log("server is running on port 8008")
})