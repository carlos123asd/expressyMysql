import { Request,Response } from "express"
import validateToken from '../middleware/validateToken'
import {Router} from 'express'

//Servicios
import { MessageModel } from "../models/modelMessage"

const routerMessage = Router()
//Message
//Conseguir todos los datos de Message
const getAllmessage = async (req:Request, res:Response) => {
    const message = await MessageModel.getMessages()
    if(message){
        return res.status(200).json(message)
    }else{
        return res.status(404).json(message)
    }
}
//Conseguir un Message
const getMessage = async (req:Request, res:Response) => {
    const {id} = req.params
    const message = await MessageModel.getMessage(id)
    if(message){
        return res.status(200).json(message)
    }else{
        return res.status(404).json(message)
    }
}
//Nuevo Message
const postMessage = async (req:Request, res:Response) => {
    const {body} = req
    const newMessage = await MessageModel.newMessage(body)
    res.status(201).json(newMessage)
}
//Edit/Update Message
const putMessage = async (req:Request, res:Response) => {
    const {body} = req
    const {id} = req.params
    const updateMessage = await MessageModel.putMessage(id,body)
    res.status(200).json(updateMessage)
}
//Remove Message 
const deleteMessage = async (req:Request, res:Response) => {
    const {id} = req.params
    const deleteMessage = await MessageModel.deleteMessage(id)
    res.status(200).json(deleteMessage)
}

//Message
//Conseguir all datos de Message
routerMessage.get('/contact',validateToken,getAllmessage)
//Conseguir all datos de Message
routerMessage.get('/contact/:id',validateToken,getMessage)
//Nuevo Message
routerMessage.post('/contact/add',validateToken,postMessage)
//Edit/Update Message
routerMessage.put('/contact/edit/:id',validateToken,putMessage)
//Remove Message 
routerMessage.delete('/contact/delete/:id',validateToken,deleteMessage)

export default routerMessage