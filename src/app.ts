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
import multer from "multer";
import path from "path";
import fs from "fs";

const app:Application = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://skillbridge-frontend-six.vercel.app"],
  credentials: true,
}));

app.use(express.json());

// 'uploads' folder 
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Keeping original extension
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// serving uploaded files statically
app.use("/uploads", express.static(uploadDir));

// upload endpoint
app.post("/student/profile/upload", upload.single("profileImage"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

app.get("/",(req,res)=>{
    res.send("Hello, Server !!")
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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