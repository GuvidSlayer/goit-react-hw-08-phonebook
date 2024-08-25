import React from 'react';
import { useDeleteContactMutation } from '../../redux/contacts/contactsSlice.js';

const ItemBar = ({ id, isOpenModal }) => {
  const [deleteContact, { isUninitialized }] = useDeleteContactMutation();

  return (
    <div>
      <button
        style={{ backgroundColor: 'yellow' }}
        onClick={() => isOpenModal(true)}
      >
        Edit
      </button>
      {isUninitialized ? (
        <button
          style={{ backgroundColor: 'red' }}
          aria-label="Delete"
          disabled={!isUninitialized}
          onClick={() => deleteContact(id)}
        >
          Remove
        </button>
      ) : (
        <div style={{ color: 'grey', width: 40 }}>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default ItemBar;
