import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/useUserStore.js"
import { DeleteButton } from "../ui/DeleteButton.jsx"
import { CircleBox } from "../ui/CircleBox.jsx"
import { useEffect, useState } from "react"
import { CreateButton } from "../ui/CreateButton.jsx"
import { CreateCategorie } from "./CreateCategorie.jsx"
import { CategoryList } from "../category/CategoryList.jsx"

export function CreateProjectDetails({id}) {

    // State Management
    const allProjects = useUserStore(state=>state.projects)
    const removeProject = useUserStore(state=>state.removeProject)
    const SelectedProject = allProjects[id]

    // Variable
    const [showCreateCategorie, setShowCreateCategorie] = useState(false)
    const navigate= useNavigate()

    // Function on delete
    const OnDelete=()=>{
        navigate("/projects")
        removeProject(SelectedProject)
    }

    // Effect pour surveiller les changements de catégories

    // Return JSX
    return (
                <div className="mx-10 my-20 p-4">
                    <div className="flex items-center justify-between ">
                        <h1 className="text-[40px] font-bold ">{SelectedProject.name}</h1>
                        <DeleteButton OnClick={OnDelete}/>  
                    </div>
                    <CircleBox padding="p-6" className="mx-auto my-10 py-20 bg-gray-50"> 
                        <div className="ml-4 items-center">
                                <div className="text-center ">
                                    <p className="mb-2" >Overall budget :</p>
                                    <p className="text-[40px] mb-5">{SelectedProject.totalBudget}€</p>
                                </div>
                                <div>
                                    <div>
                                        <p className="mb-2 text-[25px]" >Remaining Budget :  </p>
                                        <p className="text-[30px]">{SelectedProject.remainingBudget}€</p>
                                    </div>
                                    <div>
                                        <p className="mb-2" >Spent Budget :  </p>
                                        <p className="text-[30px]">{SelectedProject.spentBudget}€</p>
                                    </div>
                                </div>
                        </div>
                        <CreateButton OnClick={()=>setShowCreateCategorie(true)} Value={"+"} />
                    </CircleBox>
                    {showCreateCategorie && <CreateCategorie id={id} OnClose={()=>setShowCreateCategorie(false)}/>}
                    {SelectedProject.Categories && <CategoryList id={id}/> }
                </div>

    )
}