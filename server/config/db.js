const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async function(){
    mongoose.connect(`${process.env.MONGODB}`);
};

module.exports = connectDB;