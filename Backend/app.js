require('dotenv').config()
require('./config/db')
const express = require('express')
const cors = require("cors")
const userRoutes = require('./routes/userRoutes');
const p5Routes = require('./routes/p5Routes');
const rewardRoutes = require('./routes/rewardRoutes');

const app = express()
const port = process.env.PORT || 9002
app.use(express.json())


const corsOptions = {
    origin: "http://localhost:3000"
};
app.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})
app.use(cors(corsOptions))
app.use('/users', userRoutes);
app.use('/users', p5Routes);
app.use('/users', rewardRoutes);
app.listen(port, () => {
    console.log(`server is running on ${port}.`);
})