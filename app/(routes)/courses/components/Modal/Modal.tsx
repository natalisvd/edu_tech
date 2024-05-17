"use client";
import { FC, useState } from "react";
import Button from "../Button/button";
interface ModalProps {
  description: any;
}

const Modal: FC<ModalProps> = ({ description }) => {
  const [modalValue, setModalValue] = useState(`${description}`);
  const handleChange = (event: any) => {
    setModalValue(event.target.value);
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Edit
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* <p className="py-4">
            Press ESC key or click the button below to close
          </p> */}
          <textarea
            value={modalValue}
            onChange={handleChange}
            className="textarea"
          >
            {description}
          </textarea>
          <div className="modal-action flex justify-between w-full">
            <form method="dialog" className="w-full flex justify-between">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex justify-between w-full">
                <Button description={modalValue} oldDescription={description} />
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
