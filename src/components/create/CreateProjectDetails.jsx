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
    const DisplayProject = useUserStore(state=>state.projects)
    const RemoveProject = useUserStore(state=>state.RemoveProject)
    const ProjectTarget = DisplayProject[id]

    // Variable
    const [showCreateCategorie, setShowCreateCategorie] = useState(false)
    const navigate= useNavigate()

    // Function on delete
    const OnDelete=()=>{
        navigate("/projects")
        RemoveProject(ProjectTarget)
    }

    // Effect pour surveiller les changements de catégories

    // Return JSX
    return (
                <div className="mx-10 my-20 p-4">
                    <div className="flex items-center justify-between ">
                        <h1 className="text-[40px] text-black underline">{ProjectTarget.Nom}</h1>
                        <DeleteButton OnClick={OnDelete}/>  
                    </div>
                    <CircleBox padding="p-6" className="mx-auto my-10 py-25 bg-gray-50"> 
                        <div className="text-center">
                                <p className="mb-2" >Overall budget :</p>
                                <p className="text-[30px] mb-5">{ProjectTarget.BudgetTotal}€</p>
                                <p className="mb-2" >Remaining Budget :  </p>
                                <p className="text-[30px]">{ProjectTarget.BudgetRestant}€</p>
                        </div>
                        <CreateButton OnClick={()=>setShowCreateCategorie(true)} Value={"+"} />
                    </CircleBox>
                    {showCreateCategorie && <CreateCategorie id={id} OnClose={()=>setShowCreateCategorie(false)}/>}
                    {ProjectTarget.Categories && <CategoryList id={id}/> }
                </div>

    )
}