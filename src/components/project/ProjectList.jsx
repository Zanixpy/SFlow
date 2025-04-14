import { useStore } from "../../store.js"
import { useState } from "react"
import { CreateProject } from "../create/CreateProject.jsx"
import { useNavigate } from "react-router-dom"

export function ProjectsList() {
    const DisplayProject = useStore(state => state.projects)
    const [showCreateProject, setShowCreateProject] = useState(false)
    const navigate= useNavigate()

    return (
        <div className="flex items-center">
            <div className="m-8 p-10 min-h-165 min-w-150 rounded-xs border-1">
                <div className="flex items-center">
                    <h1 className="mr-5">Projects</h1>
                    <input 
                        className="border-1 px-3 py-1 rounded-sm text-sm" 
                        type="button" 
                        value="+" 
                        onClick={() => setShowCreateProject(true)} 
                    />
                </div>
                {showCreateProject && <CreateProject OnClose={() => setShowCreateProject(false)} />}
                <ul className="block">
                {DisplayProject && DisplayProject.map((item,index)=>
                    <li key={item.ID} onClick={()=>navigate(`/projects/${index}`)} className="flex justify-between bg-blue-200 hover:bg-blue-300 items-center h-15 p-4 w-150 rounded-sm border-1 my-5">
                        <p className="flex-1">{item.Nom}</p>
                        <p className="flex-1">{item.BudgetTotal}</p>
                        <input className="ml-auto" type="button" value="Status" />
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}