# 🎓 SkillBridge – Backend 

A full‑stack tutoring platform backend built as **Assignment Project**. SkillBridge connects learners with expert tutors. **Students** can browse tutor profiles, view availability, and book sessions instantly. **Tutors** can manage their profiles, set availability, and track their teaching sessions. **Admins** oversee the platform and manage users.


---

## Roles & Permissions

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Student** | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews, manage profile |
| **Tutor** | Experts who offer tutoring services | Create profile, set availability, view bookings, manage subjects |
| **Admin** | Platform moderators | Manage all users, view analytics, moderate content |

> 💡 **Note**: Users select their role during registration.Admin accounts should be seeded in the database.

---

## 📌 Project Purpose

The backend handles:

* Authentication & authorization (role‑based)
* Tutor discovery & filtering
* Booking lifecycle management
* Reviews & ratings
* Admin moderation & management

This project strictly follows the **assignment requirements** provided.

---

## 🛠️ Tech Stack

| Technology  | Purpose                           |
| ----------- | --------------------------------- |
| Node.js     | Runtime                           |
| Express.js  | REST API framework                |
| TypeScript  | Type safety                       |
| PostgreSQL  | Relational database               |
| Prisma ORM  | Database modeling & queries       |
| Better Auth | Authentication & session handling |
| Postman     | API testing                       |

---

## Features

### Public Features
- Browse and search tutors by subject, rating, and price
- Filter tutors by category
- View detailed tutor profiles with reviews
- Landing page with featured tutors

### Student Features
- Register and login as student
- Book tutoring sessions
- View upcoming and past bookings
- Leave reviews after sessions
- Manage profile

### Tutor Features
- Register and login as tutor
- Create and update tutor profile
- Set availability slots
- View teaching sessions
- See ratings and reviews

### Admin Features
- View all users (students and tutors)
- Manage user status (ban/unban)
- View all bookings
- Manage categories

---

> 🔐 **Admin users are seeded directly in the database.**

---

## 🗄️ Database Schema (Core Tables)
## Pages & Routes
## Public Routes
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, search, featured tutors |
| `api/tutors` | Browse Tutors | List with filters |
| `api/tutors/:id` | Tutor Profile | Details, reviews, book |
| `api/auth/login` | Login | Login form |
| `api/auth/register` | Register | Registration form |

### Student Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/api/dashboard` | Dashboard | Overview, bookings |
| `/api/dashboard/bookings` | My Bookings | Booking history |
| `/api/dashboard/profile` | Profile | Edit info |

### Tutor Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `api/tutors/dashboard` | Dashboard | Sessions, stats |
| `/api/availability/my` | Availability | Set time slots |
| `api/tutors/profile` | Profile | Edit tutor info |

### Admin Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/api/admin/dashboard` | Dashboard | Statistics |
| `api/admin/users` | Users | Manage users |
| `api/admin/bookings` | Bookings | All bookings |
| `/api/admin/categories` | Categories | Manage categories |

---

## Database Tables

Design your own schema for the following tables:

- **Users** - Store user information and authentication details
- **TutorProfiles** - Tutor-specific information (linked to Users)
- **Categories** - Subject categories for tutoring
- **Bookings** - Session bookings between students and tutors
- **Reviews** - Student reviews for tutors

> 💡 *Think about what fields each table needs based on the features above.*

## 🔗 API Endpoints (Detailed)

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Tutors (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tutors` | Get all tutors with filters |
| GET | `/api/tutors/:id` | Get tutor details |
| GET | `/api/categories` | Get all categories |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings` | Get user's bookings |
| GET | `/api/bookings/tutor` | Get booking by tutors |

### Tutor Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/tutors/profile/me` | Update tutor profile |
| PUT | `/api/tutor/profile/me` | Update availability |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings/:bookingId/review` | Create review |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id/ban` | Update user status to BANNED |
| PATCH | `/api/admin/users/:id/unban` | Update user status to ACTIVE |

---
## Flow Diagrams

### 👨‍🎓 Student Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Browse Tutors │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ View Profile │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Book Session │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Attend    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Leave Review │
                              └──────────────┘
```

### 👨‍🏫 Tutor Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Create Profile│
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Set       │
                              │ Availability │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │View Sessions │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Mark Complete │
                              └──────────────┘
```

### 📊 Booking Status

```
                              ┌──────────────┐
                              │  CONFIRMED   │
                              │   (instant)  │
                              └──────────────┘
                               /            \
                              /              \
                       (tutor)          (student)
                        marks            cancels
                            /                \
                           ▼                  ▼
                   ┌──────────────┐   ┌──────────────┐
                   │  COMPLETED   │   │  CANCELLED   │
                   └──────────────┘   └──────────────┘
```

---

## ⚙️ Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/skillbridge
JWT_SECRET=super_secret
```

---

## ▶️ Run Locally

```bash
npm install
npx prisma migrate dev
npm run dev
```

---

## 🔑 Admin Credentials (Demo)

```
Email: 
Password: 
```

---


