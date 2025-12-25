const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate(req, res, next){
    if(req.headers.cookie){
        const check = req.headers.cookie.split('=', 2);
        if(check[0] === 'auth-token'){
            try{
                const authCheck = jwt.verify(check[1], process.env.JWT_SECRET);
                next();
            }catch(e){
                const anonid = uuidv4();
                res.clearCookie("auth-token")
                    .cookie("anonid", anonid, {httpOnly: true});
                next();
            }
        } else next();
    } else{
        const anonid = uuidv4();
        res.cookie("anonid", anonid, {httpOnly: true});
        next();
    }
};

module.exports =  authenticate;