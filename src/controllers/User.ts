import { Request,Response } from "express"
import {Router} from 'express'
import validateToken from '../middleware/validateToken'
const routerUser = Router()
//Servicios
import { UserModel } from "../models/modelEmployee"

//Users
//Conseguir todos los datos de Users
const getAllusers = async (req:Request, res:Response) => {
    const users = await UserModel.getUsers()
    if(users){
        return res.status(200).json(users)
    }else{
        return res.status(404).json(users)
    }
}
//Conseguir un User
const getUser = async (req:Request, res:Response) => {
    const {id} = req.params
    const user = await UserModel.getUser(id)
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(404).json(user)
    }
}
//Nuevo User
const postUser = async (req:Request, res:Response) => {
    const {body} = req
    const newUser = await UserModel.newUser(body)
    return res.status(201).json(newUser)
}
//Edit/Update User
const putUser = async (req:Request, res:Response) => {
    const {body} = req
    const {id} = req.params
    const updateUser = await UserModel.putUser(id,body)
    return res.status(200).json(updateUser)
}
//Remove User 
const deleteUser = async (req:Request, res:Response) => {
    const {id} = req.params
    const deleteRoom = await UserModel.deleteUser(id)
    res.status(200).json({deleteRoom})
}

//Users
//Conseguir all datos de Users
routerUser.get('/user',validateToken,getAllusers)
//Conseguir un User
routerUser.get('/user/:id',validateToken,getUser)
//Nuevo User
routerUser.post('/user/add',validateToken,postUser)
//Edit/Update User
routerUser.put('/user/edit/:id',validateToken,putUser)
//Remove User 
routerUser.delete('/user/delete/:id',validateToken,deleteUser)

export default routerUser