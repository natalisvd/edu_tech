"use client";
import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { createTeam } from "@/app/(user_layout)/(admins)/manage_users/action";

interface ModalProps {
  teamName?: string;
  id: string;
}

const Modal: FC<ModalProps> = ({ teamName, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalValue, setModalValue] = useState(`${teamName}`);
  const modalRef = useRef<HTMLDialogElement>(null);

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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModalValue(event.target.value);
  };

  const handleCreateTeam = useCallback(async () => {
    try {
      await createTeam(teamName, id);
      console.log("Team created successfully.");
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  }, [teamName]);

  const modalContent = (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box">
        <div className="modal-action flex justify-between w-full">
          <textarea
            value={modalValue}
            onChange={handleChange}
            className="textarea"
          ></textarea>
          <form method="dialog" className="w-full flex justify-between">
            <button onClick={handleCreateTeam}>Create team</button>
            <div className="flex justify-between w-full">
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
        Create team
      </button>
      {isOpen &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};

export default Modal;
