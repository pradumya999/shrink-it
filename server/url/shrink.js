require("dotenv").config();
const express = require("express");
const urlModel = require("../models/url.model.js");
const userModel = require("../models/user.model.js");
const limiter = require("../middlewares/limiter.js");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/shrink", limiter, async function(req, res){
    const userCheck = req.headers.cookie.split("=", 2);
    if(userCheck[0] === "auth-token"){
        const username = jwt.verify(userCheck[1], process.env.JWT_SECRET);
        const user = await userModel.findOne({username: username});
        const originalURL = req.body.url;
        let urlkey = nanoid(9);

        try{
            const duplicate = await urlModel.findOne({
                userID: user._id,
                originalURL: originalURL
            });
            urlkey = duplicate.urlkey;
        } catch(e){
            await urlModel.create({
            userID: user._id,
            urlkey: urlkey,
            originalURL: originalURL
            });
        };

        res.status(201).json({
            check: true,
            urlkey: urlkey
        })
    } else{
        const anonID = userCheck[1];
        let urlkey = nanoid(8);
        const originalURL = req.body.url;

        try{
            const duplicate = await urlModel.findOne({
                anonID: anonID,
                originalURL: originalURL});
            urlkey = duplicate.urlkey;
        } catch(e){
            await urlModel.create({
            anonID: anonID,
            urlkey: urlkey,
            originalURL: originalURL
            });
        }

        res.status(201).json({
            check: true,
            urlkey: urlkey
        });
    }
});

module.exports = router;