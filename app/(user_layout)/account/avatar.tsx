import Image from "next/image";
import { FileInput } from "./upload-file";
import { useFormContext } from "react-hook-form";
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { AvatarContext } from "./account-form";
import { TrashIcon } from "@/app/components/Icons/TrashIcon";
import { EditIcon } from "@/app/components/Icons/EditIcon";
import { createClient } from "@/utils/supabase/client";
import { AvatarProps, AvatarUrl } from "./types";

const INPUT_ID = "avatar-input";

const ButtonGroup = ({ children }: PropsWithChildren) => (
  <div className="absolute right-0 top-0 group-hover:visible invisible join join-vertical rounded">
    {children}
  </div>
);

const ImageOverlay = () => (
  <div className="absolute w-full h-full transition-all group-hover:backdrop-brightness-50 group-hover:backdrop-grayscale-[25%] group-hover:backdrop-blur-[2px] group-hover:bg-base-300/30" />
);

const EditButton = (props: ComponentPropsWithoutRef<"label">) => (
  <label
    htmlFor={INPUT_ID}
    className="btn btn-square btn-ghost rounded join-item"
    {...props}
  >
    <EditIcon />
  </label>
);

const DeleteButton = ({
  onClick,
}: {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}) => (
  <button
    type="button"
    className="btn btn-square btn-ghost rounded join-item"
    onClick={onClick}
  >
    <TrashIcon />
  </button>
);

const getAvatarUrl = (filename: string | null) => {
  if (!filename) return null;
  const baseUrl = process.env.NEXT_PUBLIC_AVATAR_URL;
  return `${baseUrl}/${filename}`;
};

export const Avatar = ({ url }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<AvatarUrl>(url);
  const { register, setValue } = useFormContext();
  const { file, resetFile } = useContext(AvatarContext);
  useEffect(() => {
    if (url) {
      setAvatarUrl(getAvatarUrl(url));
    }
  }, [url]);
  console.log({ avatarUrl });

  const removeAvatarUrl = () => {
    setValue("avatar_url", null);
    setAvatarUrl("");
  };

  return (
    <div className="pt-2">
      <div className="avatar placeholder rounded border border-base-300">
        <div className="w-72 text-neutral-content relative group">
          {avatarUrl && !file && (
            <>
              <ImageOverlay />
              <Image
                src={avatarUrl}
                alt="avatar"
                width={228}
                height={228}
                priority
              />
              <ButtonGroup>
                <EditButton onClick={resetFile} />
                <DeleteButton onClick={removeAvatarUrl} />
              </ButtonGroup>
            </>
          )}
          {file && (
            <>
              <ImageOverlay />
              <Image
                src={URL.createObjectURL(file)}
                alt="avatar"
                width={228}
                height={228}
              />
              <ButtonGroup>
                <EditButton />
                <DeleteButton onClick={resetFile} />
              </ButtonGroup>
            </>
          )}
          {!avatarUrl && !file && (
            <label
              htmlFor={INPUT_ID}
              className="btn btn-ghost rounded btn-block h-full absolute"
            />
          )}
          <FileInput
            id={INPUT_ID}
            {...register("avatar_file")}
            icon={!avatarUrl && !file}
          />
        </div>
      </div>
    </div>
  );
};
