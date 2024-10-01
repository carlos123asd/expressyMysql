import { Bookings } from "../../models/modelBooking";

export default async function getBookings(){
    const bookings = await Bookings.find()
    return bookings
}