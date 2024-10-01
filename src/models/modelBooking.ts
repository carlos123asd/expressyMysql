import {model} from 'mongoose'
import Booking from '../interfaces/Booking';
import { bookingSchema } from '../schema/schemaBooking';

export const Bookings = model<Booking>('Booking', bookingSchema);