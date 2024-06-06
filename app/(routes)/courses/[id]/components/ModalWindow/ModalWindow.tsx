"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

interface ModalProps {
  description: any;
  id: any;
}

const ModalWindow: FC<ModalProps> = ({ description, id }) => {
  const [modalValue, setModalValue] = useState(`${description}`);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModalValue(event.target.value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  const modalContent = (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box">
        <textarea
          value={modalValue}
          onChange={handleChange}
          className="textarea"
        ></textarea>
        <div className="modal-action flex justify-between w-full">
          <form method="dialog" className="w-full flex justify-between">
            <div className="flex justify-between w-full">
              <Button description={modalValue} oldDescription={description} />
              <button type="button" className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );

  return (
    <div>
      <button className="btn" onClick={handleOpen}>
        Edit
      </button>
      {isOpen &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};

export default ModalWindow;
