import React, { useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { routsPath } from '../path/routes.js';
import { Link } from 'react-router-dom';

const { login, register } = routsPath;

const Home = () => {
  const el = useRef(null);
  const { isLoggedIn } = useAuth();

  return (
    <section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          padding: '20px 100px',
          color: '#fff',
        }}
      >
        <h1
          style={{
            fontSize: '50px',
            textAlign: 'center',
            fontWeight: '700',
            width: '650px',
            marginBottom: '10px',
          }}
        >
          Welcome to the Phonebook made by George
        </h1>
        <div style={{ marginBottom: '10px', height: '60px' }}>
          <span
            style={{
              display: 'inline',
              fontSize: '46px',
              fontWeight: '500',
            }}
            ref={el}
          ></span>
        </div>
        {isLoggedIn ? (
          <p
            style={{
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            View your
            <Link
              to="/ContactsApp"
              style={{
                color: '#fff',
                textDecoration: 'underline',
                margin: '10px',
              }}
            >
              contacts
            </Link>
            here
          </p>
        ) : (
          <div style={{ flexDirection: 'column' }}>
            <p
              style={{
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
              <Link
                style={{
                  color: '#fff',
                  textDecoration: 'underline',
                  padding: '5px',
                }}
                to={login}
              >
                Log in
              </Link>
              to your account
            </p>
            <p
              style={{
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
              Please
              <Link
                style={{
                  color: '#fff',
                  textDecoration: 'underline',
                  padding: '5px',
                }}
                to={register}
              >
                register
              </Link>
              to use Phonebook
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
