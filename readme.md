
# 🏫 School API Backend

A simple RESTful API built with **Node.js**, **Express**, and **MySQL** to manage schools and list them sorted by distance from a user's location.  
Supports adding new schools and fetching a sorted list based on geographical proximity using the **Haversine formula**.

---

## 📚 Features

✅ Add new schools with:
- Name  
- Address  
- Latitude  
- Longitude  

✅ List schools:
- Sorted by distance from a given user's coordinates  
- Returns distance in kilometers  

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **MySQL**
- **dotenv**  
- **CORS**
- **Postman** (for testing)

---

## 🗺️ API Endpoints

### 🎯 Add a School

- **URL:** `/api/v1/schools/addSchool`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Payload Example:**

```json
{
  "name": "Greenfield School",
  "address": "456 Park Avenue, Mumbai",
  "latitude": 19.076000213623047,
  "longitude": 72.87770080566406
}
```

✅ **Success Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "School added successfully"
}
```

---

### 🎯 List Schools Sorted by Distance

- **URL:** `/api/v1/schools/listSchools`
- **Method:** `GET`
- **Query Params:**
  - `latitude` (number)
  - `longitude` (number)

**Example Request:**
```
GET /api/v1/schools/listSchools?latitude=19.0760&longitude=72.8777
```

✅ **Success Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Schools fetched successfully",
  "data": [
    {
      "id": 2,
      "name": "Greenfield School",
      "address": "456 Park Avenue, Mumbai",
      "latitude": 19.076000213623047,
      "longitude": 72.87770080566406,
      "distanceInKM": 0.00008793528393775864
    },
    ...
  ]
}
```

---

## 🛠️ Setup & Run Locally

### 📋 Prerequisites:
- Node.js
- Express
- MySQL Server

### 📂 Steps:
```bash
git clone https://github.com/GuptaShubham-11/SchoolManagment.git
cd SchoolManagment
npm install
```

1. Create a `.env.local` file:
```
PORT=9999
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=schooldb
CORS_ORIGIN=http://localhost:5173
```

2. Run SQL query to create the table:
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL
);
```

3. Start the server:
```bash
npm run dev
```

✅ Server will run at `http://localhost:9999`

---

## 🧪 Test with Postman

### Example:
- Add a new school (POST)
- List schools nearby (GET)
- Use query params `latitude` and `longitude`  
  (try values like `19.0760, 72.8777` — Mumbai)

---

## 📌 Folder Structure

```
src/
 ┣ controllers/
 ┃ ┗ school.controller.js
 ┣ db/
 ┃ ┗ db.js
 ┣ routes/
 ┃ ┗ school.route.js
 ┣ utils/
 ┃ ┣ ApiError.js
 ┃ ┣ ApiResponse.js
 ┃ ┗ asyncHandler.js
 ┣ app.js
 ┣ server.js
.env.local
package.json
```

---

## 🚀 Deployment

Backend hosting platform:
- [Railway](https://railway.app)

---

## 🙌 Credits

Created by **[Gupta Shubham]**
