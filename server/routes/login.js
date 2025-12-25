require("dotenv").config();
const express = require("express");
const path = require("path");
const validator = require("../middlewares/validate.js");
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tr } = require("zod/v4/locales");
const router = express.Router();

router.post("/login", validator, async function(req, res){
    const email = req.body.email;

    const userCheck = await userModel.findOne({email});
    if(userCheck){
        const password = req.body.password;
        const passCheck = await bcrypt.compare(password, userCheck.password);
        if(passCheck){
            const authID = jwt.sign(req.body.username, process.env.JWT_SECRET);

            await userModel.findByIdAndUpdate(
                userCheck._id,
                { $set: { username: req.body.username } }
            );

            res.status(200)
                .clearCookie("anonid")
                .cookie("auth-token", authID, {httpOnly: true})
                .json({ check: true });
        } else{
            res.status(401).json({
                msg: "password is incorrect",
                check: false
            });
        }

    } else{
        res.status(404).json({
            msg: "user does not exist",
            check: false
        });
    }
});

module.exports = router;