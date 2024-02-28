import express from "express"
import {db} from "./database/db.js"
import authRoutes from './routes/authRoutes.js'
import router from "./routes/routes.js";



const app= express(); //para que nos devuelva respuestas bien
app.use(express.json());
app.use("/todos",router)
app.use("/auth",authRoutes)
app.listen(3000);

db()



