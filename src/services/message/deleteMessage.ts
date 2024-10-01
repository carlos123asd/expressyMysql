import { Messages } from "../../models/modelMessage";
export default async function deleteMessage(id:string){
    const message = await Messages.findByIdAndDelete(id)
    return message
}