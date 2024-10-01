import {Request,Response } from 'express'
import generateAccessToken from '../middleware/generateToken';
import { Router } from 'express'
import { Users } from '../models/modelEmployee';
import bcrypt from 'bcrypt'

const routerAuth = Router()
//jVRddMLh0sSYw5H 
async function authenticate (req:Request, res:Response) {
  const {email,password} = req.body
  if(!email || !password){
      return res.status(400).json({message: 'Username and password are required'})
  }else{
    const userFound = await Users.findOne({ email });
    if(!userFound){
      return res.status(400).json({message: 'User not found'})
    }else{
      const isAuth = await bcrypt.compare(password,userFound.password)
      if(!isAuth){
        return res.status(400).json({message: 'Password Incorrect'})
      }else{
        const accessToken = generateAccessToken(userFound._id)
        res.header('Authorization', accessToken).json({
            message: 'Usuario Autentificado',
            token: accessToken,
            user: userFound
        })
      }
    }
  }
  
}

routerAuth.post('/login', authenticate)

export default routerAuth