# Shrink-It

Shrink-It is a full‑stack **URL shortening application** built with **Node.js, Express, and MongoDB**, designed to support both **anonymous users** and **authenticated users** with clearly defined feature boundaries. The project focuses on authentication, rate‑limiting, clean routing, and scalable backend structure.

---

## Key Highlights

* Dual user modes: **Anonymous** & **Signed‑In**
* JWT‑based authentication
* URL shortening with redirection
* QR code generation for authenticated users
* Rate limiting & validation middleware
* Clean, modular backend architecture

---

## User Modes & Permissions

### Anonymous Users

* Can create **up to 3 short URLs**
* Identified via **HTTP‑only cookies**
* **QR code generation disabled**
* No URL tracking

### Signed‑In Users

* **Unlimited** URL generation
* Can generate **QR codes** for shortened URLs
* Can **track and manage** their URLs
* Authenticated via **JWT tokens**

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**

### Database

* **MongoDB**
* **mongoose ODM**

### Authentication & Security

* **jwt (jsonwebtoken)** – authentication
* **bcrypt** – password hashing
* **uuid** – anonymous user identification
* **cors** – controlled access

### Utilities & Helpers

* **nanoid** – short URL IDs
* **qrcode** – QR generation
* **zod** – request validation
* **dotenv** – environment variables

---

## Core Routes Overview

### Authentication

* `POST /signup` – Register a new user
* `POST /login` – Login user
* `GET /logout` – Logout user

### URL Handling

* `POST /shrink` – Create short URL
* `GET /:shortId` – Redirect to original URL
* `GET /qrcode/:shortId` – Generate QR (auth only)

### User & Utility

* `GET /` – Landing page
* `GET /user` – User details & URLs

---

## Note

* When an anonymous user signs up, their url's ownership gets transferred.

---

## License

This project is for learning and personal use.
