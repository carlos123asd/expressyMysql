import { Bookings } from "../../models/modelBooking";
import { ObjectId } from 'mongodb';

export default async function putBooking(id:string,dateUpdate:Object){
    const objectId = new ObjectId(id);
    await Bookings.updateOne({_id:objectId}, {$set:dateUpdate})
    return await Bookings.findById(id)
}