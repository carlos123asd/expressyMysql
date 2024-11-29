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
                'DELETE * FROM bookings WHERE id = ?',[id]
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
            `SELECT *
                FROM
                    bookings
                WHERE
                    id = ?;`
                ,[id]
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
                `SELECT * FROM bookings;`
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
                `UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`,values
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
                'INSERT INTO bookings (guest,orderdate,checkin,checkout,specialrequest,room_id,status) VALUES (?)',values
            );
        }catch(error){
            console.error(error)
        }
    }
    //SUM GAINS BOOKINGS
    static async sumGains(){
        const con = await connectDB()
        try {
            const gains = await con.execute(
              `
                SELECT 
                    SUM(datediff(b.checkout,b.checkin) * r.price) as gains
                from 
                    bookings b
                join 
                    rooms r
                on
                    b.room_id = r.id
                WHERE 
                YEAR(b.checkin) <= YEAR(CURDATE()) 
                AND YEAR(b.checkout) >= YEAR(CURDATE()); 
              `  
            );
            return gains;
        } catch (error) {
            console.error(error)
        }
    }
}