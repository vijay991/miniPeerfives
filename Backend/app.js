require('dotenv').config()
require('./config/db')
const express = require('express')
const cors = require("cors")
const { errorMiddleware } = require('./middleware/errorMiddleware')

const app = express()
const port = process.env.PORT || 9002
app.use(express.json())


const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is running on ${port}.`);
})