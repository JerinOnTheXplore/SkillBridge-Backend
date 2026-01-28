import express, { Application } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { tutorRoutes } from "./modules/tutor/tutor.route";


const app:Application = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello, Server !!")
});
app.use(globalErrorHandler);

app.use("/api/auth",authRoutes);

app.use("/api/tutors", tutorRoutes);


export default app;