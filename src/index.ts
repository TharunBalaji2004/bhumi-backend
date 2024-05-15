import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieparse from "cookie-parser";
import router from "./routes/router";

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

const app: Express = express();
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieparse())

const port = 3000;

app.use("/api",router)

app.get('/',(req,res)=>{
    return res.status(200).json({
        message: "Server is running"
    })
})

app.listen(port,()=>{
    console.log("listening port on:",port)
})