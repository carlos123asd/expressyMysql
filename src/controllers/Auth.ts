import {Request,Response } from 'express'
import generateAccessToken from '../middleware/generateToken';
import { Router } from 'express'
import bcrypt from 'bcrypt'
import { connectDB } from '../db/conectionDB';
import Employee from '../interfaces/Employee';

const routerAuth = Router()

async function authenticate (req:Request, res:Response) {
  const {email,password} = req.body
  if(!email || !password){
      return res.status(400).json({message: 'Username and password are required'})
  }else{
    const con = await connectDB()
    const [userFound] = await con.execute(
      'SELECT * FROM users WHERE email = ?',[email]
    )
    if(!userFound){
      return res.status(400).json({message: 'User not found'})
    }else{
      const user = userFound as Employee[];
      const isAuth = await bcrypt.compare(password,user[0].password)
      if(!isAuth){
        return res.status(400).json({message: 'Password Incorrect'})
      }else{
        const accessToken = generateAccessToken(user[0].idUser)
        res.header('Authorization', accessToken).json({
            message: 'Usuario Autentificado',
            token: accessToken,
            user: user[0]
        })
      }
    }
  }
}

routerAuth.post('/login', authenticate)

export default routerAuth