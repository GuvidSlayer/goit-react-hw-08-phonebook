import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { login } from '../../redux/auth/operations.js';
import '../../index.css';

const initialValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('No password provided.')
    .min(7, 'Password is too short - should be 8 chars minimum.'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      dispatch(login(values));
      resetForm();
    },
    validationSchema: schema,
  });

  const isDisabled = !(formik.isValid && formik.dirty);
  return (
    <form
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <h3
        style={{
          marginBottom: '30px',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        LOG IN
      </h3>

      <div>
        <label>
          EMAIL
          <input
            required
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </label>
      </div>

      <div>
        <label>
          PASSWORD
          <input
            required
            type="password"
            autoComplete="current-password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </label>
      </div>

      <center>
        <button type="submit" disabled={isDisabled}>
          SUBMIT
        </button>
      </center>
    </form>
  );
};

export default LoginForm;
