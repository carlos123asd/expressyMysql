import { Messages } from "../../models/modelMessage";
export default async function getMessages(){
    const messages = await Messages.find()
    return messages
}