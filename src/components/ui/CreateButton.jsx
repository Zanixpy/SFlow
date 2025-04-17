
export function CreateButton({OnClick,Value,px=2,py=2}) {

    return <input className={`mt-5 border-1 px-${px} py-${py} rounded-sm hover:bg-purple-400 hover:text-white`} type="button" value={Value} onClick={OnClick} />
    
    
}