export function Status({Onclick,color,activity}) {

    const colorTest = color==="black" ? `bg-black` : `bg-${color}-400` 

    return <div className="flex items-center">
                         <div className={`${colorTest} p-1 mr-2 w-[15px] h-[15px] rounded-full border-1`}></div>
                         <p className="">{activity}</p>
            </div>

}