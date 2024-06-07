import React, { FC, useState, ChangeEvent, useRef } from "react";

interface Props {
  addNewCourse: (course: {
    name: string;
    description: string;
    url: string;
  }) => void;
}

const Dialog: FC<Props> = ({ addNewCourse }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNewCourse({ name, description, url });
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        ref={dialogRef}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new courses</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <h4>Name</h4>
          <textarea
            placeholder="Type name"
            className="textarea w-full"
            value={name}
            onChange={handleNameChange}
          ></textarea>
          <h4>Description</h4>
          <textarea
            placeholder="Type Description"
            className="textarea w-full"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>

          <h4>YouTube URL</h4>
          <input
            type="text"
            placeholder="Type Youtube embed URL"
            className="input input-bordered w-full max-w-xs"
            value={url}
            onChange={handleUrlChange}
          />
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit}>
              <button type="submit" className="btn btn-success mr-3">
                Create new course
              </button>
              <button type="button" className="btn" onClick={handleClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dialog;
