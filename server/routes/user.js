const express = require("express");
const router = express.Router();

router.get("/user", function(req, res){
    const cookie = req.headers.cookie.split("=", 1);
    if(cookie[0] === "auth-token"){
        res.status(200).json({
            type: true
        });
    } else{
        res.status(404).json({
            type: false
        });
    }
});

module.exports = router;