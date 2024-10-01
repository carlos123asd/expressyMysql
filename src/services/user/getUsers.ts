import { Users } from "../../models/modelEmployee";
export default async function getUsers(){
    const users = await Users.find()
    return users
}