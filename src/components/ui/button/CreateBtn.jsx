export function CreateBtn({OnClick,Value,className}) {

    return <input className={`${className} transition-colors rounded-lg cursor-pointer`} type="button" value={Value} onClick={OnClick} />
    
    
}