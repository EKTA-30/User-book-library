const {User} = require('../models')

async function checkDuplicateUserNameAndEmail(req,res,next){
        const name = req.body.name;
        const email = req.body.email;
        if(name){
            const user = await User.findOne({
                where:{
                    name:name
                }
            });
            if (user) {
                res.status(400).send({ msg: "Username already exist" });
                return;
              }
        }
        if(email){
            const user = await User.findOne({
                where:{
                    email:email
                }
            });
            if(user){
                res.status(400).send({ msg: "Email id already exist" });
                return;
            }
        }
        next();
}
module.exports = {checkDuplicateUserNameAndEmail}