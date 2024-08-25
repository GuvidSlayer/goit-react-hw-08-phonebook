import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../redux/contacts/contactsSlice.js';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';

const ContactForm = () => {
  const { data } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const isNewName = (contacts, contactName) => {
    if (contacts.some(({ name }) => name === contactName)) {
      alert(`${contactName} is already in contacts`);
      return false;
    }
    return true;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      if (isNewName(data, values.name)) {
        addContact({ name: values.name.trim(), number: values.number.trim() });
        resetForm();
      }
    },
    validationSchema: schema,
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          autoComplete="off"
          placeholder="Name"
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />
        {formik.errors.name && formik.touched.name ? (
          <span>{formik.errors.name}</span>
        ) : null}
      </div>
      <div>
        <input
          autoComplete="off"
          placeholder="Phone"
          type="tel"
          name="number"
          onChange={formik.handleChange}
          value={formik.values.number}
        />
        {formik.errors.number && formik.touched.number ? (
          <span>{formik.errors.number}</span>
        ) : null}
      </div>
      <center>
        <button type="submit" disabled={isDisabled}>
          {isLoading ? 'Adding contact...' : 'Add contact'}
        </button>
      </center>
    </form>
  );
};

const pattern = {
  str: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
  number: '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}',
};

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(pattern.str, 'Name must be a string')
    .min(3, 'Too short, minimum length: 3')
    .max(20, 'Too long, maximum length: 20')
    .required(),
  number: yup.number().typeError().moreThan(12).required(),
});

export default ContactForm;
