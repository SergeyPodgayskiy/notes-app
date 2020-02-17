import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../../components/Modal';

const AddNoteModal = ({ handleNoteDetailsAdd, ...props }) => {
  const [noteTitle, setNoteTitle] = useState('');

  return (
    <Modal
      title="Adding a note"
      body={
        <form
          onSubmit={e => {
            handleNoteDetailsAdd(noteTitle);
              props.handleClose();
              e.preventDefault();
          }}
        >
          <div className="form-group">
            <label htmlFor="note-title" className="col-form-label">
              Title:
            </label>
            <input id="note-title" type="text" className="form-control" onChange={e => setNoteTitle(e.target.value)} />
          </div>
        </form>
      }
      footer={
        <div className="footer-actions">
          <button className="btn" onClick={props.handleClose}>
            <span className="btn__text">Close</span>
          </button>
          <button
            className="btn btn--delete-note"
            onClick={() => {
              handleNoteDetailsAdd(noteTitle);
              props.handleClose();
            }}
          >
            <span className="btn__text">Add</span>
          </button>
        </div>
      }
      {...props}
    />
  );
};

export default AddNoteModal;
