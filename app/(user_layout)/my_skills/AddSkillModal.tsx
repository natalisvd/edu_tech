"use client"

import { useCallback, useRef } from "react"
import { SkillForm } from "./SkillForm";
import { Skills } from "./types";

export const AddSkillModal = ({ skillsList }: { skillsList: Skills }) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleShow = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleClose = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>Add new skill</button>
      <dialog id="add-new-skill-modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new skill</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <SkillForm skillsList={skillsList} toggleModal={handleClose} />
        </div>
      </dialog>
    </>
  )
}