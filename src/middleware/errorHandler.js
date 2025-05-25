const errorHandler=(err,req,res)=>{
    console.log(err.message)
    res.status(500).json({error:"something went wrong"})
}

module.exports={
    errorHandler
}