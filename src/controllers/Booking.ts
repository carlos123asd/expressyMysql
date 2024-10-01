import { Request,Response } from "express"
import {Router} from 'express'
import validateToken from '../middleware/validateToken'
//Servicios
import { BookingModel } from "../models/modelBooking"


const routerBooking = Router()

//Booking
//Conseguir todos los datos de Booking
const getAllbookings = async (req:Request, res:Response) => {
    const bookings = await BookingModel.getBookings()//service
    if(bookings){
        return res.status(200).json(bookings)
    }else{
        return res.status(404).json(bookings)
    }
}
//Conseguir un Booking
const getBooking = async (req:Request, res:Response) => {
    const {id} = req.params
    const booking = await BookingModel.getBooking(id)
    if(booking){
        return res.status(200).json(booking)
    }else{
        return res.status(404).json(booking)
    }
}
//Nuevo Booking
const postBooking = async (req:Request, res:Response) => {
    const {body} = req
    const newBooking = await BookingModel.newBooking(body)
    res.status(201).json(newBooking)
}
//Edit/Update Booking
const putBooking = async (req:Request, res:Response) => {
    const {body} = req
    const {id} = req.params
    const updateBooking = await BookingModel.putBooking(id,body)
    res.status(200).json(updateBooking)
}
//Remove Booking 
const deleteBooking = async (req:Request, res:Response) => {
    const {id} = req.params
    const deleteBooking = await BookingModel.deleteBooking(id)
    res.status(200).json(deleteBooking)
}
//Room
//Conseguir all datos de room
routerBooking.get('/booking',validateToken,getAllbookings)
//Conseguir all datos de room
routerBooking.get('/booking/:id',validateToken,getBooking)
//Nuevo Room
routerBooking.post('/booking/add',validateToken,postBooking)
//Edit/Update Room
routerBooking.put('/booking/edit/:id',validateToken,putBooking)
//Remove Room 
routerBooking.delete('/booking/delete/:id',validateToken,deleteBooking)

export default routerBooking