import express from 'express'
import Connection from './database/db.js';
import route from './routes/route.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config()


const app = express();
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',route)

Connection()
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on PORT:${PORT}`))
// XgPkWxQApeKQHhrsBoXL5RUFoHo7kwsQZ6Wp8b8z