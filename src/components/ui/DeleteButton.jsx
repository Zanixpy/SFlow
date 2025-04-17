
export function DeleteButton({OnClick,px="",py="",font_size="15"}) {

    return <input className={`px-${px} py-${py} text-[${font_size}px] ml-auto border-1 rounded-sm bg-red-500 hover:bg-red-700 text-white`} type="button" value="X" onClick={OnClick} />
}