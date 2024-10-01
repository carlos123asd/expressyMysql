export const createBookingsTable = `
        create table IF NOT EXISTS bookings (
            idBooking INT auto_increment primary key,
            guest varchar(50) not null,
            orderDate datetime not null,
            checkin date not null,
            timein time not null,
            checkout date not null,
            timeout time not null,
            ordertime time not null,
            specialRequest text,
            roomType ENUM('Double Superior','Suite','Double Bed','Single Bed') NOT NULL,
            status ENUM('In Progress','Check Out','Check In') DEFAULT 'Check In' NOT NULL,
            idRoom INT not null,
            foreign key (idRoom) REFERENCES rooms(idRoom) ON DELETE CASCADE
        );
`;
