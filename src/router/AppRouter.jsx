import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthRouter, AuthRoutes } from '../auth/routes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { JournalRouter, JournalRoutes } from '../journal/routes';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { ErrorPage } from '../ui/ErrorPage';

/* const routesConfig = createHashRouter([
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
]); */

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === 'checking') return <CheckingAuth />;

  let routesConfig = createHashRouter([
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
  ]);

  if (status === 'authenticated') {
    routesConfig = createHashRouter([
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
  } else {
    routesConfig = createHashRouter([
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
        path: '/*',
        element: <Navigate to={'/auth/'} />,
      },
    ]);
  }
  return <RouterProvider router={routesConfig} />;
};
