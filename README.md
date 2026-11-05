# StudioSpace – Creative Studio Rental Marketplace

StudioSpace is a peer-to-peer creative studio rental marketplace where users can discover, list, and book creative spaces such as photography studios, podcast rooms, music studios, and workshops.

## Live Website

- **Frontend:** [Add your deployed Vercel URL]
- **Backend API:** [Add your deployed backend URL]
- **Frontend GitHub:** https://github.com/ronyakter26/studio-space-frontend
- **Backend GitHub:** https://github.com/ronyakter26/studio-space-backend

## Key Features

- Browse available creative studios.
- Search studios and filter by category.
- View detailed information about each studio.
- User authentication with email and password.
- Google authentication.
- Add new studios and manage personal listings.
- Update and delete studio listings.
- Book studios by selecting a date and time.
- View personal bookings.
- Cancel pending bookings.
- Toast notifications for user actions.
- Responsive design for desktop and mobile devices.
- Dark and light theme support.
- Loading indicators and empty states.
- Protected routes for authenticated users.

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Sonner
- Better Auth

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Native Driver
- JOSE (JWT verification)
- CORS
- dotenv

### Authentication & Security
- Better Auth
- Google OAuth
- JWT authentication for protected API endpoints
- Protected frontend routes
- Server-side authorization checks

## Project Structure

```text
studio-space/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── login/
│   │   ├── register/
│   │   ├── studios/
│   │   ├── add-studio/
│   │   ├── my-listings/
│   │   ├── my-bookings/
│   │   └── ...
│   ├── components/
│   └── lib/
├── .env.local
├── package.json
└── README.md
```

## Installation & Setup

### 1. Clone the frontend repository

```bash
git clone https://github.com/ronyakter26/studio-space-frontend.git
```

### 2. Go to the frontend folder

```bash
cd studio-space-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the frontend root directory.

```env
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Use the same MongoDB database and authentication configuration required by the backend.

### 5. Run the frontend

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

## Backend Setup

### 1. Clone the backend repository

```bash
git clone https://github.com/ronyakter26/studio-space-backend.git
```

### 2. Go to the backend folder

```bash
cd studio-space-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the backend root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
```

### 5. Run the backend

```bash
npm start
```

Backend API will run at:

```text
http://localhost:5000
```

Start both frontend and backend servers to use the application locally.

## Test Credentials

- **Email:** [ronyakter418@gmail.com]
- **Password:** [assigment8]

## Author

**Rony Akter**

Frontend Developer

GitHub: https://github.com/ronyakter26

