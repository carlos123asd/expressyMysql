import { createAmenities, createAmenities_Rooms, createPhotosRoom, createTableRooms } from '../schema/schemaRoom';
import Room from '../interfaces/Room';
import { connectDB } from '../db/conectionDB';

export class RoomModel {
    //CREATE TABLE IF NOT EXISTS
    static async create(): Promise<void> {
        const con = await connectDB()
        try{
            await con.execute(
                `
                    ${createTableRooms}
                    ${createPhotosRoom}
                    ${createAmenities}
                    ${createAmenities_Rooms}
                `
            );
        }catch(error){
            console.error(error)
        }
    }
    
   //DELETE A ROOM
   static async deleteRoom(id:string){
    const con = await connectDB()
        try{
            const room = await con.execute(
                'DELETE * FROM rooms WHERE idRoom = ?',[id]
            );
        }catch(error){
            console.error(error)
        }
    }
    
    //GET A ROOM
    static async getRoom(id:string){
        const con = await connectDB()
        try{
            const room = await con.execute(
                'SELECT * FROM rooms WHERE idRoom = ?',[id]
            );
            return room;
        }catch(error){
            console.error(error)
        }
    }
    
    //GET ALL ROOMS
    static async getRooms(){
        const con = await connectDB()
        try{
            const room = await con.execute(
                'SELECT * FROM rooms'
            );
            return room;
        }catch(error){
            console.error(error)
        }
    }
    
    //EDIT ROOM
    static async putRoom(id:string,dateUpdate:Object){
        const con = await connectDB()
        try{
            const fields = Object.keys(dateUpdate).map(key => `${key} = ?`);
            const values = Object.values(dateUpdate);
            values.push(id);
            con.execute( 
                `UPDATE rooms SET ${fields.join(', ')} WHERE idRoom = ?`,values
            )
        }catch(error){
            console.error(error)
        }
    }
    
    //NEW ROOM
    static async newRoom(room:Room){
        const con = await connectDB()
        const values = Object.values(room)
        try{
            const newRoom = await con.execute(
                'INSERT INTO rooms (roomNumber,typeRoom,description,offer,price,discount,cancellation,status) VALUES (?)',values
            );
        }catch(error){
            console.error(error)
        }
    }
}