import { Connection } from 'mysql2/promise'; 
import { createTableUsers } from '../schema/schemaEmployee';
import Employee from '../interfaces/Employee';
import { connectDB } from '../db/conectionDB';
import bcrypt from 'bcrypt';

export class UserModel {
    //CREATE TABLE IF NOT EXISTS
    static async create(): Promise<void> {
        const con = await connectDB()
        try{
            await con.execute(
                createTableUsers
            );
        }catch(error){
            console.error(error)
        }
    }

   //DELETE A USER
   static async deleteUser(id:string){
    const con = await connectDB()
        try{
            const user = await con.execute(
                'DELETE * FROM users WHERE idUser = ?',[id]
            );
        }catch(error){
            console.error(error)
        }
    }

    //GET A USER
    static async getUser(id:string){
        const con = await connectDB()
        try{
            const user = await con.execute(
                'SELECT * FROM users WHERE idUser = ?',[id]
            );
            return user;
        }catch(error){
            console.error(error)
        }
    }

    //GET ALL USERS
    static async getUsers(){
        const con = await connectDB()
        try{
            const user = await con.execute(
                'SELECT * FROM users'
            );
            return user;
        }catch(error){
            console.error(error)
        }
    }

    //EDIT USER
    static async putUser(id:string,dateUpdate:Object){
        const con = await connectDB()
        try{
            const fields = Object.keys(dateUpdate).map(key => `${key} = ?`);
            const values = Object.values(dateUpdate);
            values.push(id);
            con.execute( 
                `UPDATE users SET ${fields.join(', ')} WHERE idUser = ?`,values
            )
        }catch(error){
            console.error(error)
        }
    }

    //NEW USER
    static async newUser(user:Employee){
        const con = await connectDB()
        const cryptPassword = await bcrypt.hash(user.password, 10);
        user.password = cryptPassword
        const values = Object.values(user);
        try{
            const newuser = await con.execute(
                'INSERT INTO users (photo,name,email,password,startdate,description,phone,status) VALUES (?)',values
            );
        }catch(error){
            console.error(error)
        }
    }
}