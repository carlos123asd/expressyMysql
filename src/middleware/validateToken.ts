import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export default function validateToken(req:Request,res:Response,next:NextFunction){
    const authHeader  = req.headers['authorization'] || ""
    const accessToken = authHeader.split(' ')[1];
    if(!accessToken){
        res.status(401).json({message: "Token not provied, Unauthorized Access"})
    }

    jwt.verify(accessToken as string, process.env.TOKEN_SECRET as string, (err, user) => {
        if(err){
            res.send('Access denied, token expired or incorrect')
        }else{
            next()
        }
    })
}