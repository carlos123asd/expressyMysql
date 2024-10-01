import { Bookings } from "../../models/modelBooking";
export default async function getBooking(id:string){
    const booking = await Bookings.findById(id)
    return booking
}