import React from 'react';
import ContactForm from '../components/ContactForm/ContactForm.jsx';
import Contacts from '../components/Contacts/Contacts.jsx';

const ContactsApp = () => {
  return (
    <section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <ContactForm />
        <Contacts />
      </div>
    </section>
  );
};

export default ContactsApp;
