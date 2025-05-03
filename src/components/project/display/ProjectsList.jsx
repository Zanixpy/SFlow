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
        <Box  w={"350"} h={"200"} className="bg-white">
                <div className="flex items-center">
                    <h1 className="mr-5 text-[25px] font-bold">Projects</h1>
                    <CreateBtn OnClick={() => setShowCreateProject(true)} Value={"+"}  />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="block m-4 p-4">
                {allProjects && allProjects.map((item,index)=>
                    <li key={item.id} onClick={()=>navigate(`/projects/${index}`)} className="flex justify-between items-center py-4 pr-4 my-4 max-h-20 max-w-8xl rounded border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
                        <div className={`${item.status?.color} h-20 w-5 mr-5 rounded-xs `}></div>
                        <p className="flex-1">{item.name}</p>
                        <p className="flex-1">{item.totalBudget}€</p>
                        <input 
                            className="ml-auto px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer" 
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