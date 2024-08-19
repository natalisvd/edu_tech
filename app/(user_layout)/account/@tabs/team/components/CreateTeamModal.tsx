"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUser } from "@/app/interfaces/interfaces";
import { Alert } from "@/app/(routes)/courses/components/Alert/Alert";

type CreateTeamModalProps = {
  teamLeaders: IUser[];
};

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  teamLeaders,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState<{ message: string; severity?: string } | null>(null);

  const defaultTeamLeaderId = teamLeaders.length > 0 ? teamLeaders[0].id : "";

  const validationSchema = Yup.object({
    teamName: Yup.string().required("Team name is required"),
    teamLeaderId: Yup.string().required("Please select a team leader"),
  });

  const formik = useFormik({
    initialValues: {
      teamName: "",
      teamLeaderId: defaultTeamLeaderId,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("New Team Created:", values);
      //TODO
      setIsOpen(false);
      setAlert({ message: "Team created successfully!" });
    },
  });

  useEffect(() => {
    // Reset the form values when team leaders are updated
    if (teamLeaders.length > 0) {
      formik.setFieldValue("teamLeaderId", teamLeaders[0].id);
    }
  }, [teamLeaders]);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
      >
        Create Team
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-base-200 bg-opacity-70 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-base-content mb-6">
              Create New Team
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="form-control">
                <label htmlFor="team-name" className="label">
                  Team Name
                </label>
                <input
                  id="team-name"
                  name="teamName"
                  type="text"
                  className="input input-bordered"
                  value={formik.values.teamName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.teamName && formik.errors.teamName && (
                  <p className="text-error text-sm mt-1">
                    {formik.errors.teamName}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="team-leader" className="label">
                  Team Leader
                </label>
                <select
                  id="team-leader"
                  name="teamLeaderId"
                  className="input input-bordered"
                  value={formik.values.teamLeaderId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {teamLeaders.map((leader) => (
                    <option key={leader.id} value={leader.id}>
                      {leader.firstName} {leader.lastName}
                    </option>
                  ))}
                </select>
                {formik.touched.teamLeaderId && formik.errors.teamLeaderId && (
                  <p className="text-error text-sm mt-1">
                    {formik.errors.teamLeaderId}
                  </p>
                )}
              </div>

              {alert?.message && (
                <Alert
                  message={alert.message}
                  severity={alert.severity}
                  onHide={() => setAlert(null)}
                />
              )}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTeamModal;
