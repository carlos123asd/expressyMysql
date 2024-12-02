import { Request,Response } from "express"
import {Router} from 'express'
import validateToken from '../middleware/validateToken'
//Servicios
import { BookingModel } from "../models/modelBooking"


const routerBooking = Router()

//Booking
//Conseguir todos los datos de Booking
const getAllbookings = async (req:Request, res:Response) => {
    const bookings = await BookingModel.getBookings()
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
//Get Gains Year
const getGainsYear = async (req: Request, res: Response) => {
    try {
        const getGains = await BookingModel.sumGains();
        if (getGains) {
            res.status(200).json(getGains);
        } else {
            res.status(404).json({ message: "No se encontraron ganancias para este año" });
        }
    } catch (error) {
        console.error("Error en getGainsYear:", error);
        res.status(500).json({ message: "Error al obtener ganancias" });
    }
};
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
//Gains of Year
routerBooking.get('/gains',validateToken,getGainsYear)

export default routerBooking