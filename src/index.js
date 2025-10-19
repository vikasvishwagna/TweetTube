import dotenv from 'dotenv'
dotenv.config({
  path:'./.env'
});
import connectDB from "./db/db.js"
import { app } from './app.js';


connectDB().then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server is running at port: ${process.env.PORT}`)
  })
}).catch((error)=>{
  console.log(`Mongodb connection failed! ${error}`)
})