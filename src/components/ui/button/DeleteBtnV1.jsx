import { DeleteBtn } from "./DeleteBtn";

export function DeleteBtnV1({value="Delete",onClick}) {
    return ( 
        <DeleteBtn value={value} OnClick={onClick} className={"px-4 py-1 rounded-lg border-gray-300 text-red-600 hover:bg-red-50 border"} />
    )
}
