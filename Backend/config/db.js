const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/miniPeerfives"

mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connected successfully.');
}).catch(error => {
    throw error
})
