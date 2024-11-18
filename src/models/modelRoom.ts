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
                'DELETE * FROM rooms WHERE id = ?',[id]
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
                `SELECT
                r.*,
                GROUP_CONCAT(DISTINCT p.uri ORDER BY p.uri SEPARATOR ', ') AS photos
                FROM
                    rooms r
                LEFT JOIN
                    photos p ON r.id = p.room_id
                WHERE
                    r.id = ?;`
                ,[id]
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
                `SELECT
                    r.id,
                    r.room_number,
                    r.type_room,
                    r.description,
                    r.offer,
                    r.price,
                    r.discount,
                    r.cancellation,
                    r.status,
                    GROUP_CONCAT(DISTINCT p.uri ORDER BY p.uri SEPARATOR ', ') AS photos,
                    GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS amenities
                FROM
                    rooms r
                LEFT JOIN
                    photos p ON r.id = p.room_id
                LEFT JOIN
                    amenity_room ar ON r.id = ar.room_id
                LEFT JOIN
                    amenities a ON ar.amenity_id = a.id
                GROUP BY
                    r.id;`
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
                `UPDATE rooms SET ${fields.join(', ')} WHERE id = ?`,values
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
                'INSERT INTO rooms (room_number,type_room,description,offer,price,discount,cancellation,status) VALUES (?)',values
            );
        }catch(error){
            console.error(error)
        }
    }
}