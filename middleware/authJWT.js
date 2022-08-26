const {User} = require('../models')
const jwt = require('jsonwebtoken')

async function verifyTokens(req,res,next){
    const token = req.headers["x-access-token"]
    console.log(token);
    if(token){
        try{
            const result = jwt.verify(token,`${process.env.JWT_SECRET_KEY}`)
            if(result){
                req.userId = result.id;
                next();
            }
            else{
            res.status(400).send({ msg: "auth token has expired. Please relogin" });
        return;
            }
        }catch(err){
            console.log(err);
            res.status(400).send({ msg: "auth token has expired. Please relogin" });
        return;
        }
    }
    else{
        res.status(401).send({msg:"Auth token missing"})
    }
}


module.exports = {verifyTokens}