const express = require("express");
const auth = require("../middlewares/auth.js");
const path = require("path");

const router = express.Router();

router.get("/", auth, function(req, res){
    res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', 'homepage.html'));
});

module.exports = router;