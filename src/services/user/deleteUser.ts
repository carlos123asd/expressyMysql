import { Users } from "../../models/modelEmployee";
export default async function deleteUser(id:string){
    const user = await Users.findByIdAndDelete(id)
    return user
}