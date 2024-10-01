import { Rooms } from "../../models/modelRoom";
export default async function getRooms(){
    const rooms = await Rooms.find()
    return rooms
}