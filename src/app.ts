import express, { Application } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { tutorRoutes } from "./modules/tutor/tutor.route";
import { BookingRoutes } from "./modules/booking/booking.route";


const app:Application = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello, Server !!")
});
app.use(globalErrorHandler);
//auth
app.use("/api/auth",authRoutes);
//tutor
app.use("/api/tutors", tutorRoutes);
//booking
app.use("/api/bookings", BookingRoutes);

export default app;