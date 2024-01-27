import app from './app.js';
import { connectdb } from './Data/Database.js';

connectdb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port : ${process.env.PORT} on ${process.env.NODE_ENV} mode`)
})
