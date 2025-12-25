require("dotenv").config();
const express = require("express");
const validator = require("../middlewares/validate.js");
const userModel = require("../models/user.model.js");
const urlModel = require("../models/url.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", validator, async (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const cookie = req.headers.cookie.split("=", 2);
    const anonID = cookie[1];
    const hashedpassword = await bcrypt.hash(password, 5);

    try{
        const newUser = await userModel.create({
            username : username,
            email : email,
            password: hashedpassword
        });

        await urlModel.updateMany(
            {anonID: anonID},
            { 
                $set: { userID: newUser._id,
                        anonID: null
                }
            }
        );

        const authID = jwt.sign(username, process.env.JWT_SECRET);

        res.status(201)
            .clearCookie("anonid")
            .cookie("auth-token", authID, {httpOnly: true})
            .json({ check: true });
    } catch(e){
        res.status(409).json({
            msg: "user already exist",
            check: false
        });
    }
});

module.exports = router;