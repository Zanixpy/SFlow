export function CreateBtn({OnClick,Value}) {

    return <input className=" border-1 border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 hover:font-bold transition-colors  cursor-pointer" type="button" value={Value} onClick={OnClick} />
    
    
}