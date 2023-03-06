import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthRouter, AuthRoutes } from '../auth/routes';
import { JournalRouter, JournalRoutes } from '../journal/routes';
import { ErrorPage } from '../ui/ErrorPage';

const routesConfig = createHashRouter([
  {
    path: '/auth/*',
    element: (
      //   <PublicRoute>
      <AuthRouter />
      //   </PublicRoute>
    ),
    children: AuthRoutes,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: (
      //   <PrivateRoute>
      <JournalRouter />
      //   </PrivateRoute>
    ),
    children: JournalRoutes,
    errorElement: <ErrorPage />,
  },
  {
    path: '/*',
    element: <Navigate to={'/'} />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routesConfig} />;
};
