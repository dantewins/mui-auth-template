import { lazy } from 'react';

import Loadable from 'ui-component/loaders/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('views/auth/login')));
const AuthSignup = Loadable(lazy(() => import('views/auth/signup')));
const AuthForgotPassword = Loadable(lazy(() => import('views/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('views/auth/reset-password')));
const AuthVerify = Loadable(lazy(() => import('views/auth/verify')));

const AuthRoutes = {
  path: '/auth',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'signup',
      element: <AuthSignup />
    },
    {
      path: 'forgot-password',
      element: <AuthForgotPassword />
    },
    {
      path: 'reset-password',
      element: <AuthResetPassword />
    },
    {
      path: 'verify',
      element: <AuthVerify />
    }
  ]
};

export default AuthRoutes;
