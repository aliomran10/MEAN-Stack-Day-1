import express from 'express';
import dotenv from 'dotenv';
import database from './config/database';
import mountRoutes from './Routes';

const app: express.Application = express()

dotenv.config();
app.use(express.json())
database();

mountRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
})