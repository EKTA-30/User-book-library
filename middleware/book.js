const {Book} = require('../middleware')

 async  function checkBookTitle(req,res,next){
   try{
    const title = req.body.title;
    if(!title){
        res.send({msg:'Title is required'});
        return;
    }
    else{
        next();
    }
   }catch(err){
    res.status(500).send({msg:'Internal server error'})
   }

 }

 module.exports = {checkBookTitle}