
export function CreateButton({OnClick,Value}) {

    return <input className=" border-1 px-4 py-2 rounded-sm hover:bg-purple-400 hover:text-white" type="button" value={Value} onClick={OnClick} />
    
    
}