import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {isLoggedIn && (
        <NavLink to="/contactsApp" style={{ display: 'none' }}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
