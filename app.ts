import express from 'express';
import dotenv from 'dotenv';
const app: express.Application = express()

dotenv.config();
app.use(express.json())
app.get('/', function (req:express.Request, res:express.Response) {
    res.json({message: "Hello App"}) 
})

app.listen(process.env.PORT)