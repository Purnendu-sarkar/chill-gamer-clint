import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/mainLayout/MainLayout';
import Home from '../components/mainLayout/home/Home';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

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
            }
        ]
    }
])

export default router;