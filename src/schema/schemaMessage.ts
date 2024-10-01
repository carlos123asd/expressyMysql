import {Schema} from 'mongoose'
import Message from '../interfaces/Message'


export const messageSchema = new Schema<Message>({
    date: {type: Date,default: Date.now, required: true},
    customer: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: false},
    reason: {type: String, required: true},
    comment: {type: String, required: true},
    status: {type: String, required: true}
})