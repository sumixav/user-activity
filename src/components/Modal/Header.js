import React from "react";
import { ModalConsumer } from "./context";

const Header = ({ children }) => {
  return (
    <ModalConsumer>
      {({ toggleModal }) => (
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {children}
          </h5>
          <button
            type="button"
            className="close"
            onClick={toggleModal}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </ModalConsumer>
  );
};

export default Header;
