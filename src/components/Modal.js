import React from 'react';

const Modal = ({ handleClose, show, title, body, footer }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="close" onClick={handleClose}>
            x
          </button>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
