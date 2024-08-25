import React, { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../Layout.js';
import { Navigation } from '../Navigation/Navigation.jsx';
import { PrivateRoute } from '../../routes/PrivateRoute.jsx';
import { RestrictedRoute } from '../../routes/RestrictedRoute.jsx';
import { refreshUser } from '../../redux/auth/operations.js';
import { useAuth } from '../../hooks/useAuth.js';
import { HelmetProvider } from 'react-helmet-async';
import { routsPath, redirectPath } from '../../path/routes.js';

const Home = lazy(() => import('../../pages/Home.js'));
const Register = lazy(() => import('../../pages/Register.js'));
const Login = lazy(() => import('../../pages/Login.js'));
const ContactsApp = lazy(() => import('../../pages/ContactsApp.js'));

const { home, login, register, contactsApp } = routsPath;
const { toLogin, toContacts } = redirectPath;

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <HelmetProvider>
      <Navigation />
      <Routes>
        <Route path={home} element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path={register}
            element={
              <RestrictedRoute component={Register} redirectTo={toContacts} />
            }
          />
          <Route
            path={login}
            element={
              <RestrictedRoute component={Login} redirectTo={toContacts} />
            }
          />
          <Route
            path={contactsApp}
            element={
              <PrivateRoute component={ContactsApp} redirectTo={toLogin} />
            }
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
};

export default App;
