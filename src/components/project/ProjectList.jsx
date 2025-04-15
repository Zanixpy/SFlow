import { useStore } from "../../store.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { useNavigate } from "react-router-dom"

export function ProjectsList() {
    const DisplayProject = useStore(state => state.projects)
    const [showCreateProject, setShowCreateProject] = useState(false)
    const navigate= useNavigate()

    return (
        <div className="items-center">
            <div className="m-8 p-10 min-h-160 w-280 max-w-280 rounded-sm border-1">
                <div className="flex items-center">
                    <h1 className="mr-5">Projects</h1>
                    <input 
                        className="border-1 px-3 py-1 rounded-sm text-sm hover:bg-purple-400 hover:text-white" 
                        type="button" 
                        value="+" 
                        onClick={() => setShowCreateProject(true)} 
                    />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="block">
                {DisplayProject && DisplayProject.map((item,index)=>
                    <li key={item.ID} onClick={()=>navigate(`/projects/${index}`)} className="flex justify-between hover:bg-purple-400 hover:text-white items-center h-15 p-4 max-w-260 rounded-sm border-1 my-5">
                        <p className="flex-1">{item.Nom}</p>
                        <p className="flex-1">{item.BudgetTotal}</p>
                        <p className="flex-1">Echeance</p>
                        <p className="flex-1">Priorité</p>

                        <input className="ml-auto" type="button" value="Status" />
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}