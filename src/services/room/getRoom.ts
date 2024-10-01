import { Rooms } from "../../models/modelRoom";
export default async function getRoom(id:string){
    const room = await Rooms.findById(id)
    return room
}