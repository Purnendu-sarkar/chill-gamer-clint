import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/mainLayout/MainLayout";
import Home from "../components/mainLayout/home/Home";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import AddReview from "../pages/AddReview";
import AllReviews from "../pages/AllReviews";
import ReviewDetails from "../pages/ReviewDetails";
import MyReviews from "../pages/MyReviews";
import UpdateReview from "../pages/UpdateReview";
import Watchlist from "../pages/Watchlist";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "../auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/register",
        element: <RegisterForm></RegisterForm>,
      },
      {
        path: "/add-review",
        element: (
          <ProtectedRoute>
            <AddReview></AddReview>
          </ProtectedRoute>
        ),
      },
      {
        path: "/reviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "/review/:id",
        element: <ReviewDetails></ReviewDetails>,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://chill-gamer-server-gray.vercel.app/reviews/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch review details");
          }
          return response.json();
        },
      },

      {
        path: "/my-reviews",
        element: (
          <ProtectedRoute>
            <MyReviews></MyReviews>
          </ProtectedRoute>
        ),
      },
      {
        path: "/reviews/:id",
        element: (
          <ProtectedRoute>
            <UpdateReview></UpdateReview>
          </ProtectedRoute>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <ProtectedRoute>
            <Watchlist></Watchlist>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
