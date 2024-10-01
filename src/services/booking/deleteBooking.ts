import { Bookings } from "../../models/modelBooking";
export default async function deleteBooking(id:string){
    const booking = await Bookings.findByIdAndDelete(id)
    return booking
}