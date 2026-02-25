const QRcode = require("qrcode");
const express = require("express");
const router = express.Router();

router.post("/qrcode", async function(req, res){
    try{
        const url = req.body.url;
        if (typeof url !== 'string') {
            return res.status(400).json({
            success: false,
            msg: "Valid URL required"
            });
        }
        
        if (url.length > 2000) {
            return res.status(400).json({
            success: false,
            msg: "URL too long for QR code"
            });
        }

        const qrcode = await QRcode.toDataURL(url);
        res.status(201).json({
            success: true,
            qrcode: qrcode
        });
    }catch(e){
        res.status(500).json({
            success: false,
            msg: "Failed to generate QR code"
        });
    };
});

module.exports = router;
