import dotenv from 'dotenv';
import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import { connectDB } from './db/conectionDB';
import routerRoom from './controllers/Room';
import routerBooking from './controllers/Booking';
import routerMessage from './controllers/Message';
import routerUser from './controllers/User';
import routerAuth from './controllers/Auth';
import serverless from 'serverless-http';

dotenv.config();

const app: Application = express();
//const port = process.env.PORT || "3000"; //LOCAL
const apiPaths = {
    rooms: '/rooms',
    bookings: '/bookings',
    messages: '/messages',
    users: '/users',
};

/* Configuración de CORS */
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})

const bufferToJSONMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.body.length > 0 && req.body instanceof Buffer) {
        try {
            req.body = JSON.parse(req.body.toString());
        } catch (err) {
            return res.status(400).json({ body: req.body, length: req.body.length, error: 'Invalid JSON data' });
        }
	}
	next();
};
app.use(bufferToJSONMiddleware);

/* Ruta de inicio */
app.get('/', (req, res) => {
    res.send({
        msg: "Wellcome API Miranda"
    });
});

// Rutas de autenticación
app.use('/auth', routerAuth);
// Rutas generales de la API
app.use(apiPaths.rooms, routerRoom);
app.use(apiPaths.bookings, routerBooking);
app.use(apiPaths.messages, routerMessage);
app.use(apiPaths.users, routerUser);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Función para iniciar la conexión a la base de datos y el servidor */
const startServer = async () => {
    try {
        await connectDB();
        //app.listen(port, () => console.log(`Server listening on port ${port}`)); //LOCAL
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();

export const handler = serverless(app);   //adaptador de serverless para Lambda
