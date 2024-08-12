"use client";

import { useCallback, useEffect, useState, createContext } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { AccountFormValues as FormValues, AlertProps } from "./types";
import { Avatar } from "./avatar";
import { getProfileData, updateProfileData } from "./actions";
import { resizeImage } from "@/app/helpers/image.helper";
import { Alert } from "@/app/(routes)/courses/components/Alert/Alert";
import { IUser } from "@/app/interfaces/interfaces";
import { fetchUpdate, selectCurrentUser } from "@/app/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

const initialValues = {
  firstName: "",
  lastName: "",
  avatar_url: "",
  avatar_file: undefined,
};
type AvatarFileProps = { avatar_file?: FileList };

export const AvatarContext = createContext<{
  file: File | null;
  resetFile: () => void;
}>({ file: null, resetFile: () => {} });

export default function AccountForm() {
  const router = useRouter();
  const { user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<FormValues & AvatarFileProps>();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [bufferImage, setBufferImage] = useState<File | null>(null);

  const methods = useForm<FormValues & AvatarFileProps>({
    defaultValues: initialValues,
    ...values,
  });

  useEffect(() => {
    if (!user) return;
    setValues({
      ...initialValues,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      avatar_url: user?.avatarUrl ?? "",
    });

    methods.reset({
      ...initialValues,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      avatar_url: user?.avatarUrl ?? "",
    });
  }, [user?.id]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    resetField,
    setValue,
  } = methods;

  const watchedField = watch("avatar_file");
  const resetFile = () => resetField("avatar_file");

  const handleShowImage = useCallback(() => {
    if (watchedField?.length) {
      const image = watchedField[0];
      resizeImage(image).then((resizedImage) => setBufferImage(resizedImage));
    } else {
      setBufferImage(null);
    }
  }, [watchedField]);

  useEffect(() => {
    handleShowImage();
  }, [handleShowImage]);

  //   try {
  //     setLoading(true);
  //     const data = await getProfileData(user?.id);
  //     if (data) {
  //       setOldAvatarUrl(data.avatar_url);
  //       return setValues({
  //         ...initialValues,
  //         firstname: data.first_name ?? "",
  //         lastname: data.last_name ?? "",
  //         username: data.username ?? "",
  //         avatar_url: data.avatar_url ?? "",
  //       });
  //     }
  //   } catch (error) {
  //     setAlert({ message: "Error loading user data!", severity: "error" });
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   getProfile();
  // }, [user, getProfile]);

  async function updateProfileHandle({ firstName, lastName }: FormValues) {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", firstName || "");
      formData.append("lastName", lastName || "");
      if (bufferImage) {
        const resized = await resizeImage(bufferImage, 300, 300);
        formData.append("avatar", resized);
      }
      dispatch(fetchUpdate(formData));
      setAlert({ message: "Profile updated!" });
    } catch (error) {
      setAlert({ message: "Error updating the data!", severity: "error" });
    } finally {
      setLoading(false);
    }
  }

  const url = watch("avatar_url");

  return (
    <FormProvider {...methods}>
      <div className="grid md:grid-cols-[auto,_1fr] gap-5 mb-10 w-full justify-items-center md:justify-items-stretch">
        <AvatarContext.Provider value={{ file: bufferImage, resetFile }}>
          <Avatar url={values?.avatar_url} />
        </AvatarContext.Provider>
        <div className="md:max-w-xl w-full">
          <form
            className="grid grid-flow-row gap-y-5"
            onSubmit={handleSubmit(updateProfileHandle)}
          >
            <div className="form-control">
              <label htmlFor="email" className="label label-text">
                Email
              </label>
              <input
                className="input input-bordered"
                id="email"
                type="text"
                value={user?.email}
                // readOnly
                disabled
              />
            </div>
            <div className="form-control">
              <label htmlFor="firstName" className="label label-text">
                First Name
              </label>
              <input
                {...register("firstName")}
                className="input input-bordered"
                id="firstName"
                type="text"
              />
            </div>
            <div className="form-control">
              <label htmlFor="lastName" className="label label-text">
                Last Name
              </label>
              <input
                {...register("lastName")}
                className="input input-bordered"
                id="lastName"
                type="text"
              />
            </div>

            {alert?.message && (
              <Alert
                message={alert.message}
                severity={alert?.severity}
                onHide={() => setAlert(null)}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <button
                type="button"
                className="btn btn-primary btn-block btn-outline order-last md:order-none"
                onClick={() => router.push("/")}
              >
                go to Main Page
              </button>
              <button
                className="btn btn-primary btn-block"
                type="submit"
                // disabled={loading || !isValid}
              >
                {/* {loading ? "Loading ..." : "Update"} */}
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
