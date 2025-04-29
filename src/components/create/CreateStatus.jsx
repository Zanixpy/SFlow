import { useState } from "react"
import { Status } from "../ui/Status"

export function CreateStatus({id,onClose}) {
    const [status,setstatus]=useState([
        {activity:"To do", color:"black"},
        {activity:"In Progress", color:"yellow"},
        {activity:"Done",color:"green"}
    ])

    return (
        <div className="flex items-center">
            <div className="m-8 p-10 min-h-165 min-w-150 rounded-xs border-1  ">
                {status.map(item=>
                    <Status activity={item.activity} color={item.color} />
                )}
            </div>
        </div>
    )
    
}