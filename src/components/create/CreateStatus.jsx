import { useState } from "react"

export function CreateStatus() {
    const [status,setstatus]=useState([
        {activity:"A faire", color:"white"},
        {activity:"En cours", color:"yellow"},
        {activity:"Fait",color:"green"}
    ])

    return (
        <div className="flex items-center">
            <div className="m-8 p-10 min-h-165 min-w-150 rounded-xs border-1  ">
                {status.map(item=>
                    <div className="flex items-center">
                         <div className={`bg-${item.color}-400` + " p-1 mr-1 w-[10px] h-[10px] rounded-full border-1"}></div>
                         <p>{item.activity}</p>

                    </div>

                )}
            </div>
        </div>
    )
    
}