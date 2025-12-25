const express = require("express");
const urlModel = require("../models/url.model.js");
const path = require("path");
const router = express.Router();

router.get("/:urlkey", async function(req, res){
    const urlkey = req.params.urlkey;
    const response = await urlModel.findOne({urlkey: urlkey});
    if(!response) res.status(404).sendFile(path.join(__dirname, '..', '..', 'public', '404.html'));
    else{
        await urlModel.findOneAndUpdate(
            {urlkey: urlkey},
            {$inc: {clicks: 1}},
            {new: true}
        );
        res.status(301).redirect(`${response.originalURL}`);
    }
});

module.exports = router;