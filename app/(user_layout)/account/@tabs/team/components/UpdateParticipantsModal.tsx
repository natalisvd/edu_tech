"use client";
import { getAllWorkers } from "@/app/api";
import { IUser } from "@/app/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { getAvatarUrl } from "@/app/helpers/image.helper";

interface UpdateParticipantsModalProps {
  teamId: string;
  updateParticipants: (selectedWorkers: IUser[]) => void;
}

const UpdateParticipantsModal: React.FC<UpdateParticipantsModalProps> = ({
  teamId,
  updateParticipants,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [workers, setWorkers] = useState<IUser[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<IUser[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isModalOpen) return;
    init();
  }, [isModalOpen]);

  const init = async () => {
    try {
      const respWorkers = (await getAllWorkers({
        withTeam: false,
      })) as IUser[];

      // Sort workers: first those with a team, then those without
      const sortedWorkers = respWorkers.sort((a, b) =>
        a.teamId === teamId ? -1 : 1
      );
      setWorkers(sortedWorkers);
      setFilteredWorkers(sortedWorkers);

      // Pre-select workers that are already in the team
      const preSelectedWorkers = new Set(
        sortedWorkers
          .filter((worker) => worker.teamId === teamId)
          .map((worker) => worker.id)
      );
      setSelectedWorkers(preSelectedWorkers);
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

  const handleCheckboxChange = (workerId: string) => {
    setSelectedWorkers((prevSelectedWorkers) => {
      const updatedSelectedWorkers = new Set(prevSelectedWorkers);
      if (updatedSelectedWorkers.has(workerId)) {
        updatedSelectedWorkers.delete(workerId);
      } else {
        updatedSelectedWorkers.add(workerId);
      }
      return updatedSelectedWorkers;
    });
  };

  const handleUpdateParticipants = () => {
    const selectedWorkersList = workers
      .filter((worker) => selectedWorkers.has(worker.id))
      .map((worker) => ({ ...worker, teamId }));
    updateParticipants(selectedWorkersList);
    closeModal();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query) {
      setFilteredWorkers(workers);
      return;
    }
    setFilteredWorkers(
      workers.filter(
        (worker) =>
          worker.firstName.toLowerCase().includes(query) ||
          worker.lastName.toLowerCase().includes(query)
      )
    );
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-green-500 hover:text-green-700"
      >
        <FaEdit size={16} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 min-h-[60vh] max-h-[80vh] overflow-hidden flex flex-col">
            {" "}
            {/* Set min height and max height */}
            <h2 className="text-lg font-bold mb-4">Update Participants</h2>
            {/* Search bar */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search workers..."
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex-grow overflow-y-auto">
              <div className="grid grid-cols-3 gap-4">
                {filteredWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="flex flex-col items-center gap-2 mb-4"
                  >
                    <Image
                      src={getAvatarUrl(worker.avatarUrl)}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-gray-800 text-center">
                      {worker.firstName} {worker.lastName}
                    </span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedWorkers.has(worker.id)}
                        onChange={() => handleCheckboxChange(worker.id)}
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 border-2 ${
                          selectedWorkers.has(worker.id)
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300"
                        } rounded-sm flex items-center justify-center`}
                      >
                        {selectedWorkers.has(worker.id) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateParticipants}
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

export default UpdateParticipantsModal;
