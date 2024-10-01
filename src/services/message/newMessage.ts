import Message from "../../interfaces/Message";
import { Messages } from "../../models/modelMessage";

export default async function newMessage(message:Message){
    const newMessage = new Messages({...message})
    const insertMessage = await newMessage.save()
    return insertMessage
}