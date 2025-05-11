import { useNavigate } from "react-router-dom";

export function ProjectCard({project,index}) {

    const navigate= useNavigate()
    

    return (<>
        <li className="p-5 mb-8 w-70 h-60 rounded-lg border border-gray-300 hover:shadow-lg shadow-sm transition-colors">
                        <p className="text-[25px] font-bold mb-4">{project.name}</p>
                        <p className="mb-2">{project.spentBudget} € / {project.totalBudget} €</p>
                        <p className="text-gray-500 mb-2 ">{project.categories.length} categories</p>
                        <div className="w-30" onClick={()=>navigate(`/projects/${index}`)}>
                            <p className="mb-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">View details -{'>'}</p>
                        </div>
        </li>
    </>);
}
