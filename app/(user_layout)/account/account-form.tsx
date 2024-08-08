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
import { fetchUpdate } from "@/app/store/slices/userSlice";
import { useAppDispatch } from "@/app/store/hooks";

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

export default function AccountForm({ user }: { user: IUser | null }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<FormValues & AvatarFileProps>();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [bufferImage, setBufferImage] = useState<File | null>(null);
  const [oldAvatarUrl, setOldAvatarUrl] = useState("");

  const methods = useForm<FormValues & AvatarFileProps>({
    defaultValues: initialValues,
    values,
  });

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

  // const getProfile = useCallback(async () => {
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

  async function updateProfile({
    firstName,
    lastName,
    // avatar_file,
  }: FormValues) {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", firstName || "");
      formData.append("lastName", lastName || "");
      debugger
      if(bufferImage){
        const resized = await resizeImage(bufferImage, 300, 300);
        debugger
        formData.append("avatar", resized);
      }
      debugger
     await dispatch(fetchUpdate(formData))
      // console.log({ avatar_file });

      // }
      // if (!user?.id) return;
      // const userId = user.id;
      // const filePath = await uploadAvatar(bufferImage, userId, avatar_url);
      // if (!avatar_url && !filePath) deleteOldAvatar(oldAvatarUrl);
      // await updateProfileData(userId, {
      //   username,
      //   firstname,
      //   lastname,
      //   avatar_url: filePath ?? avatar_url,
      // });
      setAlert({ message: "Profile updated!" });
    } catch (error) {
      setAlert({ message: "Error updating the data!", severity: "error" });
    } finally {
      setLoading(false);
    }
  }

  const url = watch("avatar_url");

  // const deleteOldAvatar = async (filePath: string) => {
  //   // try {
  //   //   const { error, data } = await supabase.storage
  //   //     .from("avatars")
  //   //     .remove([filePath]);
  //   // } catch (error) {
  //   //   console.error(error);
  //   //   return false;
  //   // }
  // };

  // const uploadAvatar = async (
  //   file: File | null,
  //   userId: string,
  //   oldAvatarUrl: string | null
  // ) => {
  //   try {
  //     if (!file) return null;

  //     if (oldAvatarUrl) {
  //       await deleteOldAvatar(oldAvatarUrl);
  //     }

  //     const resizedFile = await resizeImage(file, 300, 300);
  //     const fileExt = resizedFile.name.split(".").pop();
  //     const filePath = `${userId}-${Math.random()}.${fileExt}`;

  //     // const { error: uploadError } = await supabase.storage
  //     //   .from("avatars")
  //     //   .upload(filePath, resizedFile);

  //     // if (uploadError) {
  //     //   throw uploadError;
  //     // }
  //     setValue("avatar_url", filePath);
  //     setAlert({ message: "Avatar updated!", severity: "success" });
  //     return filePath;
  //   } catch (error) {
  //     console.log("uploadAvatar [error]", error);
  //     setAlert({ message: "Error uploading avatar!", severity: "error" });
  //   }
  // };

  return (
    <FormProvider {...methods}>
      <div className="grid md:grid-cols-[auto,_1fr] gap-5 mb-10 w-full justify-items-center md:justify-items-stretch">
        <AvatarContext.Provider value={{ file: bufferImage, resetFile }}>
          <Avatar url={url} />
        </AvatarContext.Provider>
        <div className="md:max-w-xl w-full">
          <form
            className="grid grid-flow-row gap-y-5"
            onSubmit={handleSubmit(updateProfile)}
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
              <label htmlFor="firstname" className="label label-text">
                First Name
              </label>
              <input
                // {...register("firstname")}
                className="input input-bordered"
                id="firstname"
                type="text"
              />
            </div>
            <div className="form-control">
              <label htmlFor="lastname" className="label label-text">
                Last Name
              </label>
              <input
                // {...register("lastname")}
                className="input input-bordered"
                id="lastname"
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
