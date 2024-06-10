"use client"

import { useCallback, useRef } from "react"
import { SkillForm } from "./SkillForm";
import { SkillFormValues, Skills } from "../types";
import { addNewUserSkill } from "../actions";

export const AddSkillModal = ({ skillsList, userId }: { skillsList: Skills, userId: string }) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleShow = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleClose = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const onSubmit = async (data: SkillFormValues) => {
    await addNewUserSkill({
      ...data,
      userId
    })
  }

  return (
    <>
      <button type='button' className="btn btn-primary w-full" onClick={handleShow} disabled={skillsList?.length === 0}>Add new skill</button>
      <dialog id="add-new-skill-modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new skill</h3>
          <p className="py-4">Choose your skill and its level below</p>
          <SkillForm skillsList={skillsList} toggleModal={handleClose} onSubmit={onSubmit} />
        </div>
      </dialog>
    </>
  )
}