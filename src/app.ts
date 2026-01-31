import express, { Application } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { tutorRoutes } from "./modules/tutor/tutor.route";
import { BookingRoutes } from "./modules/booking/booking.route";
import { reviewRoutes } from "./modules/review/review.route";
import { availabilityRoutes } from "./modules/availability/availability.routes";
import { adminRoutes } from "./modules/admin/admin.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { studentDashboardRoutes } from "./modules/studentDashboard/student.dashboard.route";
import cors from "cors";

const app:Application = express();


app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello, Server !!")
});
app.use(globalErrorHandler);
//auth
app.use("/api/auth",authRoutes);
//studentDashboard
app.use("/api/dashboard", studentDashboardRoutes);
//tutor
app.use("/api/tutors", tutorRoutes);
//booking
app.use("/api/bookings", BookingRoutes);
//review
app.use("/api", reviewRoutes);
//availability
app.use("/api/availability", availabilityRoutes);
//admin
app.use("/api/admin", adminRoutes);
//category
app.use("/api/categories",CategoryRoutes)


export default app;