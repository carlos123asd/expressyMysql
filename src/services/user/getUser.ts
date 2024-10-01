import { Users } from "../../models/modelEmployee";
export default async function getUser(id:string){
    const user = await Users.findById(id)
    return user
}