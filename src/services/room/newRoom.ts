import Room from "../../interfaces/Room";
import rooms from '../../db/room.json'
import { Rooms } from "../../models/modelRoom";

export default async function newRoom(room:Room){
    const newRoom = new Rooms({ ...room })
    const insertRoom = await newRoom.save()
    return insertRoom
}