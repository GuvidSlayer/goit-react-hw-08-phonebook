import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { register } from '../../redux/auth/operations.js';

const initialValues = {
  name: '',
  email: '',
  password: '',
};
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'to short, min: 3')
    .max(20, 'to long, max: 20')
    .required('Username is required'),
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('No password provided.')
    .min(7, 'Password is too short - should be 8 chars minimum.'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      dispatch(register(values));
      resetForm();
    },
    validationSchema: schema,
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  return (
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <h3
        style={{
          marginBottom: '30px',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        REGISTER
      </h3>

      <div>
        <label>
          USERNAME
          <input
            required
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="3-20 characters"
          />
          {formik.errors.name && formik.touched.name ? (
            <span>{formik.errors.name}</span>
          ) : null}
        </label>
      </div>

      <div>
        <label>
          EMAIL
          <input
            required
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="ex. contact@mail.com"
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
            placeholder="min. 8 characters"
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

export default RegisterForm;
