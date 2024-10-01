import Booking from "../../interfaces/Booking";
import { Bookings } from "../../models/modelBooking";

export default async function newBooking(booking:Booking){
    const newBooking = new Bookings({...booking})
    const insertBooking = await newBooking.save()
    return insertBooking
}