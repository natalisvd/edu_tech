import React, { FC, useState, ChangeEvent } from "react";

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
  };

  const closeModal = () => {
    const dialog = document.getElementById("my_modal_5") as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new courses</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <h4>Name</h4>
          <textarea
            className="textarea w-full"
            value={name}
            onChange={handleNameChange}
          ></textarea>
          <h4>Description</h4>
          <textarea
            className="textarea w-full"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>

          <h4>YouTube URL</h4>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={url}
            onChange={handleUrlChange}
          />
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit}>
              <button type="submit" className="btn btn-success">
                Create new course
              </button>
              <button type="button" className="btn" onClick={closeModal}>
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
