# Chill Gamer: A Game Review Application


![Chill Gamer Screenshot](https://i.ibb.co.com/Y70BVnjx/Chill-Gamer.png)

## Description
Chill Gamer is a user-friendly platform where users can explore, share, and discover game reviews. The application allows users to log in, add reviews, explore existing reviews, and manage their game watchlist. It also includes user authentication, review management, and personalized features like adding games to a watchlist.

The goal of this project is to create an interactive experience where users can freely explore game reviews, share their experiences, and enjoy a smooth, chill, and responsive interface.

## Live URL
[Live Demo](https://chill-game-3f796.web.app/)



## Features


- User Authentication: Users can log in, register and Google Sign-in.
- Game Reviews: Users can submit, view, update, and delete reviews.
- Watchlist: Logged-in users can add games to their watchlist.
- Highest Rated Games: A section dedicated to showing top-rated games.
- Responsive Design: Fully responsive layout for desktop, tablet, and mobile devices.
- Sort & Filter Reviews: Sort reviews based on rating or year, and filter by genres.
- Add to Watchlist: Users can add reviews to their personal watchlist.
- Loading Spinner: A spinner is displayed while data is loading.
- Dark/Light Theme Toggle: Users can switch between dark and light themes.



## Technologies Used

- Frontend: React.js, TailwindCSS, DaisyUI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Firebase (email/password and third-party login)
- Hosting: Firebase (Frontend), Vercel (Backend)

## 📦 Setup Instructions

### 🔧 Installation
1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd chill-gamer

2. **Install Dependencies:**

   ```bash
   npm install
3. **Set Up Environment Variables:
Create a `.env` file in the project root and add the following variables:**

   ```bash
   VITE_API_URL=your_backend_api_url
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
    ```

4. **Run the Application:**

   ```bash
   npm run dev
   ````

5. **Build for Production:**

   ```bash
   npm run build
   ```
