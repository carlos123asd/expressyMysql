import User from "../../interfaces/Employee";
import { Users } from "../../models/modelEmployee";
import {ObjectId} from "mongodb"

export default async function putUser(id:string,dateUpdate:User){
    const idObject = new ObjectId(id)
    await Users.updateOne({_id:idObject}, {$set:dateUpdate})
    const userUpdated = await Users.findById(id)
    return userUpdated
}