import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import classNames from "classnames";
import Header from "./Header";
import Body from "./Body";
import { ModalProvider } from "./context";
import Portal from "components/Portal";
import usePrevious from "hooks/usePrevious";

const Modal = ({ isShow, onClose, children, outerClassName }) => {
  const [isModal, setIsModal] = useState(isShow);

  useEffect(() => {
    setIsModal(isShow);
  }, [isShow]);

  const prevIsModal = usePrevious(isModal);
  useEffect(() => {
    if (prevIsModal && !isModal && onClose) onClose();
  }, [isModal, prevIsModal, onClose]);

  const toggleModal = () => {
    setIsModal((prev) => {
      return !prev;
    });
  };
  const state = {
    toggleModal,
  };

  const modalDisplay = useMemo(() => {
    if (isShow)
      return {
        display: "block",
      };
    return {
      display: "none",
    };
  }, [isShow]);
  return (
    <>
      <ModalProvider value={state}>
        <div
          style={modalDisplay}
          className={classNames("modal fade", { show: isModal })}
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden={isModal}
        >
          <div className={`modal-dialog modal-dialog-centered ${outerClassName}`} role="document">
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </ModalProvider>
      {isModal && (
        <Portal>
          <div
            className={classNames("modal-backdrop", "fade", { show: isModal })}
          />
        </Portal>
      )}
    </>
  );
};

Modal.Header = Header;
Modal.Body = Body;

Modal.defaultProps = {
  isShow: false,
  outerClassName:""
};

export default Modal;
