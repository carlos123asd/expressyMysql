import User from "../../interfaces/Employee";
import { Users } from "../../models/modelEmployee";

export default async function newUser(user:User){
    const newUser = new Users({...user})
    const insertUser = await newUser.save()
    return insertUser
}