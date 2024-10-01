import { Request,Response } from "express"
import validateToken from '../middleware/validateToken'
import {Router} from 'express'
//Servicios
import { RoomModel } from "../models/modelRoom"

const routerRoom = Router()

//Room
//Conseguir todos los datos de room
const getAllrooms = async (req:Request, res:Response) => {
    const rooms = await RoomModel.getRooms()
    if(rooms){
        return res.status(200).json(rooms)
    }else{
        return res.status(404).json(rooms)
    }
}
//Conseguir un room
const getRoom = async (req:Request, res:Response) => {
    const {id} = req.params
    const room = await RoomModel.getRoom(id)
    if(room){
        return res.status(200).json(room)
    }else{
        return res.status(404).json(room)
    }
}
//Nuevo Room
const postRoom = async (req:Request, res:Response) => {
    const {body} = req
    const newRoom = await RoomModel.newRoom(body)
    return res.status(201).json(newRoom)
}
//Edit/Update Room
const putRoom = async (req:Request, res:Response) => {
    const {body} = req
    const {id} = req.params
    const updateRoom = await RoomModel.putRoom(id,body)
    return res.status(200).json(updateRoom)
}
//Remove Room 
const deleteRoom = async (req:Request, res:Response) => {
    const {id} = req.params
    const deleteRoom = await RoomModel.deleteRoom(id)
    return res.status(200).json(deleteRoom)
}
//Room
//Conseguir all datos de room
routerRoom.get('/room',validateToken,getAllrooms)
//Conseguir all datos de room
routerRoom.get('/room/:id',validateToken,getRoom)
//Nuevo Room
routerRoom.post('/room/add',validateToken,postRoom)
//Edit/Update Room
routerRoom.put('/room/edit/:id',validateToken,putRoom)
//Remove Room 
routerRoom.delete('/room/delete/:id',validateToken,deleteRoom)

export default routerRoom