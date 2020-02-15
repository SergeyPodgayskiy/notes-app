import React from 'react';
import Modal from '../../../components/Modal';

const DeleteNoteModal = ({ handleNoteDelete, ...props }) => {
  return (
    <Modal
      title="Removal of the note"
      body={<p> Do you really want to delete this note? There will no way to restore it.</p>}
      footer={
        <div className="footer-actions">
          <button className="btn" onClick={props.handleClose}>
            <span className="btn__text">Close</span>
          </button>
          <button
            className="btn btn--delete-note"
            onClick={() => {
              handleNoteDelete();
              props.handleClose();
            }}
          >
            <span className="btn__text">Delete</span>
          </button>
        </div>
      }
      {...props}
    />
  );
};

export default DeleteNoteModal;
