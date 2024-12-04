import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/mainLayout/MainLayout';
import Home from '../components/mainLayout/home/Home';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import AddReview from '../pages/AddReview';
import AllReviews from '../pages/AllReviews';
import ReviewDetails from '../pages/ReviewDetails';

const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <LoginForm></LoginForm>
            },
            {
                path: "/register",
                element: <RegisterForm></RegisterForm>
            },
            {
                path: "/add-review",
                element: <AddReview></AddReview>
            },
            {
                path: "/reviews",
                element: <AllReviews></AllReviews>
            },
            {
                path: "/review/:id",
                element: <ReviewDetails></ReviewDetails>,
                
            },
        ]
    }
])

export default router;