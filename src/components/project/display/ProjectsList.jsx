import { useUserStore } from "../../../store/useUserStore.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { useNavigate } from "react-router-dom"
import { CreateBtn } from "../../ui/button/CreateBtn.jsx"
import { Box } from "../../ui/container/Box.jsx"
import { CreateStatus } from "../create/CreateStatus.jsx"

export function ProjectsList() {
    const allProjects = useUserStore(state => state.projects)

    const [showCreateProject, setShowCreateProject] = useState(false)
    const [activeStatusIndex, setActiveStatusIndex] = useState(null)

    const navigate= useNavigate()
    


    return (
        <Box  w={"350"} h={"200"} className="text-black">
                <div className="flex items-center">
                    <h1 className="mr-5 text-[25px] font-bold">Projects</h1>
                    <CreateBtn OnClick={() => setShowCreateProject(true)} Value={"+"} className={'text-[20px] border rounded-full px-4 py-2 bg-[#38B2AC] hover:bg-[#2C7A7B] text-white font-bold'}  />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="block m-4 p-4">
                {allProjects && allProjects.map((item,index)=>
                    <li key={item.id} onClick={()=>navigate(`/projects/${index}`)} className="p-5 m-4 w-80 h-60 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
                        <p className="text-[25px] font-bold mb-4">{item.name}</p>
                        <p className="">{item.spentBudget} € / {item.totalBudget} €</p>
                        <p></p>
                        <input 
                            className={`ml-auto px-5 py-2 rounded ${item.status?.color} text-white cursor-pointer`} 
                            type="button" 
                            value={item.status?.activity}
                            id={item.status?.id}
                            onClick={(event) => {
                                event.stopPropagation()
                                setActiveStatusIndex(activeStatusIndex === index ? null : index)
                            }} 
                        />
                        {activeStatusIndex === index && <CreateStatus id={index} Onclose={()=>setActiveStatusIndex(null)} />}
                    </li>         
                )}
                </ul>
        </Box>
    )
}