# MERN Survey Form Application

A full-stack survey form built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User-friendly survey form (name, gender, nationality, email, phone, address, message)
- Form validation and anti-spam measures
- Admin login to view submissions
- Responsive design
- Export submissions as CSV

## Demo

[Deployed App Link](https://survey-form-five-silk.vercel.app)

## ScreenShots

![Dark/admin/dashboard](https://i.vgy.me/AD3x3t.png)

![Dark/home](https://i.vgy.me/bgJx8W.png)

![Light/admin/dashboard](https://i.vgy.me/EzIMsU.png)

### Demo Video

[![asciicast](https://i.vgy.me/eFFQkL.png)](https://youtu.be/7NwV1eWGEnw)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or Atlas)

### Local Setup

#### 1. Clone the repository

```bash
git clone https://github.com/square-story/surveyForm.git
cd surveyForm
```

#### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

after setup the enviornment variables

```bash
npm run dev:backend
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

after setup the enviornment variables

```bash
npm build
npm start
```

#### 4. Access the App

```bash
it will access the desired port

example:

http://localhost:3000 for backend
http://localhost:5173 for frontend
```

### Deployment

#### Build Frontend

```bash
cd frontend
cp .env.example .env
npm run build
```

#### Deploy Backend

- Deploy backend to Heroku/Render/AWS.
- Serve frontend build from backend or deploy frontend separately to Vercel/Netlify.

#### Set Environment Variables

- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `HOST`

### Design Decisions & Notes

- Used TypeScript for type safety.
- Used Tailwind CSS for responsive UI.
- Admin authentication uses JWT.
- Anti-spam: basic honeypot field and validation.

### License

MIT
