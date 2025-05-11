import { useUserStore } from "../../../store/useUserStore.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { useNavigate } from "react-router-dom"
import { CreateBtn } from "../../ui/button/CreateBtn.jsx"
import { Box } from "../../ui/container/Box.jsx"
import { CreateStatus } from "../create/CreateStatus.jsx"
import { AddBtn } from "../../ui/button/AddBtn.jsx"

export function ProjectsList() {
    const allProjects = useUserStore(state => state.projects)

    const [showCreateProject, setShowCreateProject] = useState(false)
    const [activeStatusIndex, setActiveStatusIndex] = useState(null)

    const navigate= useNavigate()
    

    return (
        <Box w={"300"} h={"200"} padding="p-3" margin="mx-30 mt-8 mb-10" className="text-black">
                <div className="flex justify-between items-center mb-15">
                    <h1 className="text-[25px] font-bold">Budget projects</h1>
                    <AddBtn onClick={() => setShowCreateProject(true)} value={"+ New project"} />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="flex justify-between flex-wrap">
                {allProjects && allProjects.map((item,index)=>
                    <li key={item.id} className="p-5 mb-8 w-80 h-60 rounded-lg border border-gray-300 hover:shadow-lg shadow-sm transition-colors">
                        <p className="text-[25px] font-bold mb-4">{item.name}</p>
                        <p className="mb-2">{item.spentBudget} € / {item.totalBudget} €</p>
                        <p className="text-gray-500 mb-2 ">{item.categories.length} categories</p>
                        <div className="w-30" onClick={()=>navigate(`/projects/${index}`)}>
                            <p className="mb-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">View details -{'>'}</p>
                        </div>
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