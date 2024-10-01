import { Messages } from "../../models/modelMessage";
import {ObjectId} from "mongodb"

export default async function putMessage(id:string,dateUpdate:Object){
    const idObject = new ObjectId(id)
    const stateupdate = await Messages.findByIdAndUpdate({_id:idObject}, {$set:dateUpdate})
    return await stateupdate
}