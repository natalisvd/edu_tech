import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"

type AvatarUrl = string | StaticImport | undefined | null

export const Avatar = ({ url, userName }: { url: AvatarUrl, userName: string }) => {
  return (
    <div>
      <div className="avatar placeholder rounded border border-base-300">
        <div className="min-w-60 max-w-72 text-neutral-content">
          {url
          ? <Image src={url} alt={`${userName}_avatar`} width={228} height={228} priority />
          : <button type='button' className="btn btn-ghost btn-block h-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button> // -- add dropzone or file input to upload user photo --
          }
        </div>
      </div>
    </div>
  )
}
