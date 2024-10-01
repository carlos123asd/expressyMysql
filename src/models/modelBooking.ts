import { createBookingsTable } from '../schema/schemaBooking';
import Booking from '../interfaces/Booking';
import { connectDB } from '../db/conectionDB';

export class BookingModel {
    //CREATE TABLE IF NOT EXISTS
    static async create(): Promise<void> {
        const con = await connectDB()
        try{
            await con.execute(
                createBookingsTable
            );
        }catch(error){
            console.error(error)
        }
    }
    //DELETE A BOOKING
    static async deleteBooking(id:string){
        const con = await connectDB()
        try{
            const booking = await con.execute(
                'DELETE * FROM bookings WHERE idBooking = ?',[id]
            );
        }catch(error){
            console.error(error)
        }
    }
    //GET A BOOKING
    static async getBooking(id:string){
        const con = await connectDB()
        try{
            const booking = await con.execute(
                'SELECT * FROM bookings WHERE idBooking = ?',[id]
            );
            return booking;
        }catch(error){
            console.error(error)
        }
    }
    //GET ALL BOOKINGS
    static async getBookings(){
        const con = await connectDB()
        try{
            const booking = await con.execute(
                'SELECT * FROM bookings'
            );
            return booking;
        }catch(error){
            console.error(error)
        }
    }
    //EDIT BOOKING
    static async putBooking(id:string,dateUpdate:Object){
        const con = await connectDB()
        try{
            const fields = Object.keys(dateUpdate).map(key => `${key} = ?`);
            const values = Object.values(dateUpdate);
            values.push(id);
            con.execute( 
                `UPDATE bookings SET ${fields.join(', ')} WHERE idBooking = ?`,values
            )
        }catch(error){
            console.error(error)
        }
    }
    //NEW BOOKING
    static async newBooking(booking:Booking){
        const con = await connectDB()
        const values = Object.values(booking);
        try{
            const newbooking = await con.execute(
                'INSERT INTO bookings (guest,orderDate,checkin,timein,checkout,timeout,ordertime,specialRequest,roomType,status,idRoom) VALUES (?)',values
            );
        }catch(error){
            console.error(error)
        }
    }
}