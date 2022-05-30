import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import costumer from "./routes/costumers.routes.js";
import product from "./routes/products.routes.js"
import provider from "./routes/providers.routes.js";
import sale from "./routes/sale.routes.js";
import credito from "./routes/credits.routes.js";
import purchase from "./routes/purchase.routes.js";


const app = express();
app.use(express.json());
app.use(cors());

//Settings
dotenv.config();
const port = process.env.PORT

const main = async () =>{
    app.use('/api', costumer);
    app.use('/api', product);
    app.use('/api', provider);
    app.use('/api', sale);
    app.use('/api', credito)
    app.use('/api', purchase)
    
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    });
}

main().catch((err) => console.log(err));