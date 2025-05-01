import { useUserStore } from "../../store/useUserStore.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { useNavigate } from "react-router-dom"
import { CreateButton } from "../ui/CreateButton.jsx"
import { Box } from "../ui/Box.jsx"
import { CreateStatus } from "../create/CreateStatus.jsx"

export function ProjectsList() {
    const DisplayProject = useUserStore(state => state.projects)

    const [showCreateProject, setShowCreateProject] = useState(false)
    const [activeStatusIndex, setActiveStatusIndex] = useState(null)

    const navigate= useNavigate()
    const [status,setstatus]=useState({
        id:"1TD",
        activity:"To do", 
        color:"bg-black",
    })

    const handleStatusChange = (newStatus) => {
        setstatus(newStatus)
        setActiveStatusIndex(null)
    }

    return (
        <Box w={"800"} className="bg-white">
                <div className="flex items-center">
                    <h1 className="mr-5">Projects</h1>
                    <CreateButton OnClick={() => setShowCreateProject(true)} Value={"+"}  />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="block">
                {DisplayProject && DisplayProject.map((item,index)=>
                    <li key={item.ID} onClick={()=>navigate(`/projects/${index}`)} className="flex justify-between items-center py-4 pr-4 my-4 max-h-20 max-w-8xl rounded border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
                        <div className={`${item.status?.color || status.color} h-20 w-5 mr-5 rounded-xs `}></div>
                        <p className="flex-1">{item.Nom}</p>
                        <p className="flex-1">{item.BudgetTotal}€</p>
                        <p className="flex-1">Echeance</p>
                        <p className="flex-1">Priorité</p>
                        <input 
                            className="ml-auto px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer" 
                            type="button" 
                            value={item.status?.activity || status.activity}
                            id={item.status?.id || status.id}
                            onClick={(event) => {
                                event.stopPropagation()
                                setActiveStatusIndex(activeStatusIndex === index ? null : index)
                            }} 
                        />
                        {activeStatusIndex === index && <CreateStatus id={index} value={item.status || status} setvalue={handleStatusChange}/>}
                    </li>
                 
                )}
                </ul>
        </Box>
    )
}