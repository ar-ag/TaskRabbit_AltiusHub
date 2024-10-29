const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});


const MONGO_URI = process.env.MONGO_URI; // accessing env variable

mongoose.connect(MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(() => {
    console.log(`Mongo Db connected`);
})
.catch((err) => {
    console.log('error in connecting to Mongo DB', err);
})