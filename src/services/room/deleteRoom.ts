import { Rooms } from "../../models/modelRoom";
export default async function deleteRoom(id:string){
    const roomdeleted = await Rooms.findByIdAndDelete(id)
    return roomdeleted
}