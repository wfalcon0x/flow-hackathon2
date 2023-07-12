import { PropsWithRef } from "react"

type Props = {
  onClickNext?: Function
}

export default function NextButton({...props}:PropsWithRef<Props>) {
  return (
    <button 
      onClick={() => props.onClickNext()}
      className="cursor-pointer [border:none] py-[17px] px-[22px] bg-[transparent] absolute top-[483px] left-[250px] rounded-[31.36px] [background:linear-gradient(90.19deg,_#eb98fd,_#6ab7ff)] w-[124px] h-12 flex flex-row box-border items-center justify-center gap-[8px]">
      <b className="relative text-base font-outfit text-white text-center">
        Next
      </b>
      <img
        className="relative w-[23.92px] h-[10.97px]"
        alt=""
        src="/arrow-right.svg"
      />
    </button>
  )
}
