export const createTableRooms = `
    create table IF NOT EXISTS rooms (
        idRoom int auto_increment primary key,
        roomNumber int CHECK (roomNumber between 1000 and 9999) not null,
        typeRoom ENUM('Double Superior','Suite','Double Bed','Single Bed') NOT NULL,
        description TEXT not null,
        offer BOOLEAN not null,
        price TEXT not null,
        discount INT not null,
        cancellation TEXT not null,
        status ENUM("Booked","Available") NOT NULL
    );
`
export const createPhotosRoom = `
    create table IF NOT EXISTS photosRoom (
        idPhoto INT auto_increment primary key,
        uri TEXT not null,
        idRoom INT not null,
        FOREIGN KEY(idRoom) REFERENCES rooms(idRoom) ON DELETE CASCADE
    );
`

export const createAmenities = `
    create table IF NOT EXISTS amenities (
        idAmenitie INT auto_increment primary key,
        name varchar(20)
    );
`

export const createAmenities_Rooms = `
    create table IF NOT EXISTS amenities_rooms (
        idAmenitie INT,
        idRoom INT,
        primary key (idAmenitie,idRoom),
        foreign key (idAmenitie) REFERENCES amenities(idAmenitie) ON DELETE CASCADE,
        foreign key (idRoom) REFERENCES rooms(idRoom) ON DELETE CASCADE
    );
`