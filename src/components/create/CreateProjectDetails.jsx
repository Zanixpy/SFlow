import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/useUserStore.js"
import { DeleteButton } from "../ui/DeleteButton.jsx"
import { CircleBox } from "../ui/CircleBox.jsx"
import { useState } from "react"
import { Box } from "../ui/Box.jsx"
import { CreateButton } from "../ui/CreateButton.jsx"
import { CreateCategorie } from "./CreateCategorie.jsx"
import { CategoryList } from "../category/CategoryList.jsx"

export function CreateProjectDetails({id}) {

    // State Management
    const DisplayProject = useUserStore(state=>state.projects)
    const RemoveProject = useUserStore(state=>state.RemoveProject)

    // Variable
    const [showCreateCategorie, setShowCreateCategorie] = useState(false)
    const navigate= useNavigate()

    // Function on delete
    const OnDelete=()=>{
        RemoveProject(DisplayProject[id])
        navigate("/projects")
    }
    
    // Return JSX
    return (
                <div className="mx-10 my-20 p-4">
                    <div className="flex items-center justify-between ">
                        <h1 className="text-[40px] text-black underline">{DisplayProject[id] && DisplayProject[id].Nom}</h1>
                        <DeleteButton OnClick={OnDelete}/>  
                    </div>
                    <CircleBox padding="p-6" className="mx-auto my-10 py-35 bg-gray-50"> 
                        <div className="text-center">
                                <p>Overall budget :</p>
                                <p className="text-[30px]">{DisplayProject[id] && DisplayProject[id].BudgetTotal}€</p>
                                <p className="text-[15px] mt-5" >Remaining budget : {DisplayProject[id] && DisplayProject[id].BudgetRestant} </p>
                        </div>
                        <CreateButton OnClick={()=>setShowCreateCategorie(true)} Value={"+"} />
                    </CircleBox>
                    {showCreateCategorie && <CreateCategorie id={id} OnClose={()=>setShowCreateCategorie(false)} />}
                    {DisplayProject[id].Categories && <CategoryList id={id}/> }
                </div>

    )
}