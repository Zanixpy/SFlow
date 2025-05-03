import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../../store/useUserStore.js"
import { DeleteBtn } from "../../ui/button/DeleteBtn.jsx"
import { CircleBox } from "../../ui/container/CircleBox.jsx"
import { CategoriesList } from "../../category/display/categoriesList.jsx"

export function ProjectInfo({id}) {

    // State Management
    const allProjects = useUserStore(state=>state.projects)
    const removeProject = useUserStore(state=>state.removeProject)
    const selectedProject = allProjects[id]

    // Variable
    const navigate= useNavigate()

    // Function on delete
    const OnDelete= async ()=>{
        await new Promise(resolve=>setTimeout(resolve,300))
        navigate("/projects")
        removeProject(selectedProject)
    }

    // Effect pour surveiller les changements de catégories

    // Return JSX
    return (
                <div className="mx-10 my-20 p-4">
                    <div className="flex items-center justify-between ">
                        <h1 className="text-[40px] font-bold ">{selectedProject?.name}</h1>
                        <DeleteBtn OnClick={OnDelete}/>  
                    </div>
                    <CircleBox padding="p-6" w={"120"} h={"120"} className="mx-auto my-10 py-20 bg-gray-50"> 
                        <div className="ml-4 items-center">
                                <div className="text-center ">
                                    <p className="mb-2" >Overall budget :</p>
                                    <p className="text-[40px] mb-5">{selectedProject?.totalBudget}€</p>
                                </div>
                                <div className="flex items-center text-[15px]">
                                        <p>Remaining Budget : {selectedProject?.remainingBudget}€</p>
                                        <p className="text-[20px] mx-3"> | </p>
                                        <p>Spent Budget : {selectedProject?.spentBudget}€ </p>       
                                </div>
                        </div>
                    </CircleBox>
                    {selectedProject?.categories && <CategoriesList id={id} OnClick={()=>setShowCreateCategorie(true)}/> }
                </div>

    )
}