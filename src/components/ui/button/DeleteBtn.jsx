export function DeleteBtn({OnClick}) {

    return <input className="px-4 py-2 text-[15px] ml-auto border-1 rounded-sm bg-red-500 cursor-pointer hover:bg-red-700 text-white" type="button" value="X" onClick={OnClick} />
}