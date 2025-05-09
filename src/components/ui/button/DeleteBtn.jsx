export function DeleteBtn({OnClick,className,value="X"}) {

    return <input className={`cursor-pointer transition-colors ${className}`} type="button" value={value} onClick={OnClick} />
}