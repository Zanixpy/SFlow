export function DeleteBtn({OnClick,className,value="X"}) {

    return <input className={`opacity-80 hover:opacity-100 cursor-pointer ${className}`} type="button" value={value} onClick={OnClick} />
}