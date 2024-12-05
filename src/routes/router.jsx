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
        element: <AddReview></AddReview>,
      },
      {
        path: "/reviews",
        element: <AllReviews></AllReviews>,
      },
      // {
      //     path: "/review/:id",
      //     element: <ReviewDetails></ReviewDetails>,

      // },
      {
        path: "/review/:id",
        element: <ReviewDetails></ReviewDetails>,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/reviews/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch review details");
          }
          return response.json();
        },
      },

      {
        path: "/my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/reviews/:id",
        element: <UpdateReview></UpdateReview>,
      },
      {
        path: "/watchlist",
        element: <Watchlist></Watchlist>
      }
    ],
  },
]);

export default router;
