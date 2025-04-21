import { useUserStore } from "../../store/useUserStore.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { useNavigate } from "react-router-dom"
import { CreateButton } from "../ui/CreateButton.jsx"
import { Box } from "../ui/Box.jsx"

export function ProjectsList() {
    const DisplayProject = useUserStore(state => state.projects)

    const [showCreateProject, setShowCreateProject] = useState(false)
    
    const navigate= useNavigate()

    return (
        <Box w={"800"} className="bg-white">
                <div className="flex items-center">
                    <h1 className="mr-5">Projects</h1>
                    <CreateButton OnClick={() => setShowCreateProject(true)} Value={"+"}  />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="block">
                {DisplayProject && DisplayProject.map((item,index)=>
                    <li key={item.ID} onClick={()=>navigate(`/projects/${index}`)} className="flex justify-between items-center p-4 my-4 rounded border border-gray-200 hover:bg-purple-400 hover:text-white transition-colors cursor-pointer">
                        <p className="flex-1">{item.Nom}</p>
                        <p className="flex-1">{item.BudgetTotal}€</p>
                        <p className="flex-1">Echeance</p>
                        <p className="flex-1">Priorité</p>
                        <input className="ml-auto px-3 py-1 rounded bg-gray-100 hover:bg-gray-200" type="button" value="Status" />
                    </li>
                )}
                </ul>
       
        </Box>
    )
}