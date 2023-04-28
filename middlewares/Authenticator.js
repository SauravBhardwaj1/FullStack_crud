const jwt = require('jsonwebtoken');

const authValidator = (req,res,next)=>{
    const token = req.headers.authorization

    if(token){
        try {
            var decoded = jwt.verify(token.split(" ")[1], 'shhhhh');
            if(decoded){
                next()                
            }else{
                res.status(400).send({"err":"Error verifying"})
            }
        } catch (error) {
            res.status(400).send({"err": error.message})
        }
    }else{
        res.status(400).send({"err":"Please login!!!"})
    }
}

module.exports = {authValidator}