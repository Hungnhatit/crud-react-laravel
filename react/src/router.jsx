import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Users from './views/Users.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import NotFound from './views/NotFound.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserForm from './views/UserForm.jsx';
const router = createBrowserRouter([
  {
    // Route khi đã đăng nhập vào tài khoản
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/add-new-user',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },

    ]
  },

  // Trang lúc chưa đăng nhập
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;