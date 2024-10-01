import {model} from 'mongoose'
import Room from '../interfaces/Room';
import { roomSchema } from '../schema/schemaRoom';

export const Rooms = model<Room>('Room', roomSchema);