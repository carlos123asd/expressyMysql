import {model} from 'mongoose'
import Message from '../interfaces/Message';
import { messageSchema } from '../schema/schemaMessage';

export const Messages = model<Message>('Message', messageSchema);