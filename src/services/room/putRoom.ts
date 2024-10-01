import Room from "../../interfaces/Room";
import { Rooms } from "../../models/modelRoom";
import { ObjectId } from 'mongodb';

export default async function putRoom(id:string,dateUpdate:Room){
    const objectId = new ObjectId(id);
    await Rooms.updateOne({_id:objectId}, {$set:dateUpdate})
    const roomUpdated = await Rooms.findById(id)
    return roomUpdated
}