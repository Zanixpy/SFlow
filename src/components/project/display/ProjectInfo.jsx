import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../../store/useUserStore.js"
import { DeleteBtn } from "../../ui/button/DeleteBtn.jsx"
import { CircleBox } from "../../ui/container/CircleBox.jsx"
import { CategoriesList } from "../../category/display/categoriesList.jsx"
import { Box } from "../../ui/container/Box.jsx"
import { TasksList } from "../../task/display/TasksList.jsx"

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
    return ( <Box h={'300'} w={'320'} margin="m-25" padding="p-5" className="text-black">
                    <div className="mb-4 text-black opacity-80 hover:opacity-100 cursor-pointer w-55 transitions-colors" onClick={()=>navigate("/projects")}>
                        <p>{'<'}- Retour au tableau de bord</p>
                    </div>
                    <div className="flex items-center justify-between ">
                        <h1 className="text-[40px] font-bold ">{selectedProject?.name}</h1>
                        <DeleteBtn OnClick={OnDelete} value="Delete" className={"px-4 py-1 rounded-lg border-gray-300 text-red-600 hover:bg-red-50 border"}/>  
                    </div>
                    <CircleBox  w={"100"} h={"100"} className="mx-[35%] my-10 py-30 bg-gray-50"> 
                        <div className="">
                                <div className="text-center mb-10 ">
                                    <p className="mb-2 text-[20px]" >Overall budget :</p>
                                    <p className="text-[40px] mb-5 font-bold">{selectedProject?.totalBudget}€</p>
                                </div>
                                <div className="flex items-center text-[15px] ml-2">
                                        <p>Remaining Budget : <span className="font-bold">{selectedProject?.remainingBudget}€</span></p>
                                        <p className="text-[20px] mx-3"> | </p>
                                        <p>Spent Budget : <span className="font-bold">{selectedProject?.spentBudget}€</span> </p>       
                                </div>
                        </div>
                    </CircleBox>
                    {selectedProject?.categories && <CategoriesList id={id} OnClick={()=>setShowCreateCategorie(true)}/>}
                    <TasksList id={id} />
            </Box>
    )
}