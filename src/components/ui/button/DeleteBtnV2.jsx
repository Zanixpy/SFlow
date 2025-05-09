import { DeleteBtn } from "./DeleteBtn";

export function DeleteBtnV2({value="Delete",onClick}) {
    return ( 
        <DeleteBtn value={value} OnClick={onClick} className={"px-4 py-1 rounded-lg text-red-600 hover:bg-red-50 "} />
    )
}
