import React from 'react';
import { routsPath } from '../../path/routes.js';
import { NavLink } from 'react-router-dom';

const { login, register } = routsPath;

export const AuthNav = () => {
  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <NavLink to={login} style={{ color: 'inherit' }}>
        Login
      </NavLink>
      <NavLink to={register} style={{ color: 'inherit' }}>
        Register
      </NavLink>
    </div>
  );
};
