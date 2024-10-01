import dotenv from 'dotenv'
import {Application} from 'express'
import express from 'express'
import routerRoom from './controllers/Room'
import routerBooking from './controllers/Booking'
import routerMessage from './controllers/Message'
import routerUser from './controllers/User'
import routerAuth from './controllers/Auth'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger-output.json'
import mongoose from 'mongoose'
import { Users } from './models/modelEmployee'
import { employeeFaker } from './faker/users'
import { Bookings } from './models/modelBooking'
import { Messages } from './models/modelMessage'
import { bookingFaker } from './faker/bookings'
import { messageFaker } from './faker/message'
import bcrypt from 'bcrypt'

dotenv.config()

const app:Application = express()
const port = process.env.PORT || "3000"
const apiPaths = {
    rooms: '/rooms',
    bookings: '/bookings',
    messages: '/messages',
    users: '/users',
}
/*función de seguridad que permite a los navegadores web realizar solicitudes
a un dominio diferente al que sirve la página web . Sin CORS, los navegadores
restringen dichas solicitudes debido a cuestiones de seguridad.*/
app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send({
        msg: "Login"
    })
})
//Rutas Auth
app.use('/auth',routerAuth)

//Rutas generales
app.use(apiPaths.rooms,routerRoom)
app.use(apiPaths.bookings,routerBooking)
app.use(apiPaths.messages,routerMessage)
app.use(apiPaths.users,routerUser)

//Documentacion Rutas SwagGer
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/*
bcrypt.genSalt(10).then((response) => {
     bcrypt.hash('jVRddMLh0sSYw5H', response).then((response) => {
        console.log(response)
     }) ;
});*/
      

const startServer = async () => {
    try {
        await mongoose.connect(
            process.env.URIMongo as string   //Coneccion al cluster URI -> compass conection: mongodb://express:123456@localhost:27017/hoteldb
        )
        app.listen(port, () => console.log('Server listen on port 3000'))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()

/*Users.insertMany(employeeFaker)
  .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
  .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} users errors occurred during the insertMany operation.`);
  });
Bookings.insertMany(bookingFaker)
.then(docs => console.log(`${docs.length} bookings have been inserted into the database.`))
.catch(err => {
console.error(err);
console.error(`${err.writeErrors?.length ?? 0} bookings errors occurred during the insertMany operation.`);
});
Messages.insertMany(messageFaker)
.then(docs => console.log(`${docs.length} messages have been inserted into the database.`))
.catch(err => {
console.error(err);
console.error(`${err.writeErrors?.length ?? 0} messages errors occurred during the insertMany operation.`);
});*/