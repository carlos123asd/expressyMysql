import { Connection } from 'mysql2/promise'; 
import { createTableMessages } from '../schema/schemaMessage';
import Message from '../interfaces/Message';
import { connectDB } from '../db/conectionDB';

export class MessageModel {
    //CREATE TABLE IF NOT EXISTS
    static async create(): Promise<void> {
        const con = await connectDB()
        try{
            await con.execute(
                createTableMessages
            );
        }catch(error){
            console.error(error)
        }
    }
   //DELETE A MESSAGE
   static async deleteMessage(id:string){
    const con = await connectDB()
        try{
            const message = await con.execute(
                'DELETE * FROM messages WHERE idMessage = ?',[id]
            );
        }catch(error){
            console.error(error)
        }
    }
    //GET A MESSAGE
    static async getMessage(id:string){
        const con = await connectDB()
        try{
            const message = await con.execute(
                'SELECT * FROM messages WHERE idMessage = ?',[id]
            );
            return message;
        }catch(error){
            console.error(error)
        }
    }
    //GET ALL MESSAGES
    static async getMessages(){
        const con = await connectDB()
        try{
            const message = await con.execute(
                'SELECT * FROM messages'
            );
            return message;
        }catch(error){
            console.error(error)
        }
    }
    //EDIT MESSAGE
    static async putMessage(id:string,dateUpdate:Object){
        const con = await connectDB()
        try{
            const fields = Object.keys(dateUpdate).map(key => `${key} = ?`);
            const values = Object.values(dateUpdate);
            values.push(id);
            con.execute( 
                `UPDATE messages SET ${fields.join(', ')} WHERE idMessage = ?`,values
            )
        }catch(error){
            console.error(error)
        }
    }
    //NEW MESSAGE
    static async newMessage(message:Message){
        const con = await connectDB()
        const values = Object.values(message)
        try{
            const newmessage = await con.execute(
                'INSERT INTO messages (date,customer,email,phone,reason,comment,status) VALUES (?)',values
            );
        }catch(error){
            console.error(error)
        }
    }
}