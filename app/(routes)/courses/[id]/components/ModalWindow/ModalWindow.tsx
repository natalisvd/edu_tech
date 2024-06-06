"use client";
import React, { FC, useState, useRef, useEffect, Children } from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import { createClient } from "@/utils/supabase/client";

interface ModalProps {
  children: any;
}

const ModalWindow: FC<ModalProps> = ({ children }) => {
  const [modalValue, setModalValue] = useState(``);
  const [name, setName] = useState(``);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModalValue(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("lessons")
      .insert([{ description: modalValue, name: name }])
      .select();

    window.location.reload();
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
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="input"
          placeholder="Enter name"
        />
        <textarea
          value={modalValue}
          onChange={handleChange}
          className="textarea"
        ></textarea>
        <div className="modal-action flex justify-between w-full">
          <form method="dialog" className="w-full flex justify-between">
            <div className="flex flex-col w-full">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
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
      <button className="btn btn-primary" onClick={handleOpen}>
        Create new lesson
      </button>
      {isOpen &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};

export default ModalWindow;
