import { CreateBtn } from "./CreateBtn";

export function AddBtn({value,onClick}){


    return (
        <CreateBtn Value={value} OnClick={onClick} className={'text-[16px] border rounded-full px-3 py-1  bg-[#38B2AC] hover:bg-[#2C7A7B] text-white font-bold'}  />
    )

}