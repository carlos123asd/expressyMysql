export default interface Employee{
    _id:string
    photo:string
    name:string
    email:string
    password:string
    startdate:Date
    description:string
    phone:string
    status:'inactive'|'active'
}