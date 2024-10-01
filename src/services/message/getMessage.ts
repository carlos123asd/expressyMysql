import { Messages } from "../../models/modelMessage";
export default async function getMessage(id:string){
    const message = await Messages.findById(id)
    return message
}