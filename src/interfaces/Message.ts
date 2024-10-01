export default interface Message{
    _id:string
    date:Date
    customer:string
    email:string
    phone:string
    reason:string
    comment:string
    status:'none'|'published'|'archived'
}