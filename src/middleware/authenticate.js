
const {verifyToken}=require("../utils/jwt")

const authenticateToken=(req,res,next)=>{
    const authHaeder=req.headers["authorization"]
    const token=authHaeder && authHaeder.split(" ")[1]


    if(!token) return res.status(401).json({error:"Access token required"})

        try {
            const decode=verifyToken(token)
            req.user=decode
            next()
        } catch (error) {
            return res.status(403).json({error:"Invalid or expired token"})
        }
}

module.exports={
    authenticateToken
}