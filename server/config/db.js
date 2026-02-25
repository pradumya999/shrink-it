const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async function(){
    try{
        await mongoose.connect(`${process.env.MONGODB}`);
        console.log("MongoDB Connected");
    } catch(e){
        console.error("Database connection failed", error.message);
    }
};

module.exports = connectDB;