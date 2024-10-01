import {Schema} from 'mongoose'
import Room from '../interfaces/Room'


export const roomSchema = new Schema<Room>({
    roomNumber: {type: Number, required: true},
    photo: {type: [String], required: true},
    typeRoom: {type: String, required: true},
    description: {type: String, required: false},
    offer: {type: Boolean, required: false},
    price: {type: String, required: true},
    discount: {type: Number, required: true},
    cancellation: {type: String, required: true},
    status: {type: String, required: true},
    amenities: {type: [String], required: true}
})