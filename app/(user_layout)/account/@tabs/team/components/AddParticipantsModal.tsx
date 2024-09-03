"use client";
import { getAllWorkers } from "@/app/api";
import { IUser } from "@/app/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

interface AddParticipantsModalProps {
  addParticipants: () => void;
}

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = ({
  addParticipants,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [workers, setWorkers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!isModalOpen) return;
    init();
  }, [isModalOpen]);

  const init = async () => {
    try {
      const respTeamleaders = (await getAllWorkers({
        withTeam: false,
      })) as IUser[];
      setWorkers(respTeamleaders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-green-500 hover:text-green-700"
      >
        <FaPlus size={16} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Add Participants</h2>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addParticipants();
                  closeModal();
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddParticipantsModal;
