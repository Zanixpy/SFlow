import { useState } from "react"
import { Status } from "../ui/Status"
import { useUserStore } from "../../store/useUserStore.js"


export function CreateStatus({id,setvalue}) {
    const DisplayProject = useUserStore(state => state.projects)
    const ProjectTarget = DisplayProject[id]

    const status=[
        {id:"1TD",activity:"To do", color:"bg-black",border:true},
        {id:"2IP", activity:"In Progress", color:"bg-yellow-400",border:true},
        {id:"3D",activity:"Done",color:"bg-green-400",border:false}
    ]

    return (
        <div className="flex items-center">
            <div className="m-8 max-h-30 max-w-100 rounded-lg border-1 border-gray-300">
                {status.map(item=>
                    <Status 
                        key={item.id}
                        activity={item.activity} 
                        color={item.color} 
                        borderEnable={item.border} 
                        projet={ProjectTarget}
                        status={status}
                        setvalue={setvalue} 
                    />
                )}
            </div>
        </div>
    )
    
}