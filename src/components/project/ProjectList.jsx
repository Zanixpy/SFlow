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
        <Box h={"180"} w={"280"}>
                <div className="flex justify-between items-center">
                    <h1>Projects</h1>
                    <CreateButton OnClick={() => setShowCreateProject(true)} Value={"+"} px={3} py={1} />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="block">
                {DisplayProject && DisplayProject.map((item,index)=>
                    <li key={item.ID} onClick={()=>navigate(`/projects/${index}`)} className="flex justify-between hover:bg-purple-400 hover:text-white items-center h-15 p-4 max-w-260 rounded-sm border-1 my-5">
                        <p className="flex-1">{item.Nom}</p>
                        <p className="flex-1">{item.BudgetTotal}€</p>
                        <p className="flex-1">Echeance</p>
                        <p className="flex-1">Priorité</p>
                        <input className="ml-auto" type="button" value="Status" />
                    </li>
                )}
                </ul>
       
        </Box>
    )
}