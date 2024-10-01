import {Schema} from 'mongoose'
import Booking from '../interfaces/Booking'


export const bookingSchema = new Schema<Booking>({
    guest: {type: String, required: true},
    orderDate: {type: Date, default: Date.now, required: true},
    checkin: {type: Date, required: true},
    timein: {type: Date, required: true},
    checkout: {type: Date, required: true},
    timeout: {type: Date, required: true},
    ordertime: {type: Date, required: true},
    specialRequest: {type: String, required: false},
    roomType: {type: String, required: true},
    status: {type: String, required: true},
    idRoom: {type:  String, required: true}
})