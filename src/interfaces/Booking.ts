export default interface Booking{
    idBooking:string
    guest: string;
    orderDate: Date;
    checkin: Date;
    timein: Date;
    checkout: Date;
    timeout: Date;
    ordertime: Date;
    specialRequest: string;
    roomType: 'Suite' | 'Double Superior' | 'Double Bed' | 'Single Bed';
    status: 'In Progress' | 'Check Out' |'Check In';
    idRoom: string;
}
