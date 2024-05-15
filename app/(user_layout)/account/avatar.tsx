import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { Url } from "next/dist/shared/lib/router/router"
import Image from "next/image"

export const Avatar = ({ url }: { url: string | StaticImport }) => {
  return (
    <div className="border border-base-300">
      <div className='avatar min-w-60 max-w-72'>
        <div>
          <Image src={url} alt={'User_avatar'} objectFit="" fill />
        </div>
      </div>
    </div>
  )
}