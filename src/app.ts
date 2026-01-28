import express, { Application } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middlewares/errorHandler";


const app:Application = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello, Server !!")
});
app.use(globalErrorHandler);

app.use("/api/auth",authRoutes);

export default app;