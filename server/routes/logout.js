const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.delete("/logout", function(req, res){
    res.clearCookie("auth-token");
    const anonid = uuidv4();
    res.cookie("anonid", anonid, {httpOnly: true});
    res.status(200).redirect("/");
});

module.exports = router;