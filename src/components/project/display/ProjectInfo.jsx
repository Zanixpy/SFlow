import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../../store/useUserStore.js"
import { DeleteBtn } from "../../ui/button/DeleteBtn.jsx"
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
    
    return ( <Box w={"330"} h={"200"} padding="p-4" margin="mx-30 mt-4 mb-10" className="text-black">
                    <div className="mb-4 text-gray-500 text-[14px]  hover:text-gray-700 cursor-pointer w-55 transitions-colors" onClick={()=>navigate("/projects")}>
                        <p><span className="text-[17px]">{'<'}-</span> Retour au tableau de bord</p>
                    </div>
                    <div className="flex items-center justify-between ">
                        <h1 className="text-[40px] font-bold ">{selectedProject?.name}</h1>
                        <DeleteBtn OnClick={OnDelete} value="Delete" className={"px-4 py-1 rounded-lg border-gray-300 text-red-600 hover:bg-red-50 border"}/>  
                    </div>
                    <Box  w={"200"} h={"60"} margin="my-4" padding="p-5" className="border-1 border-gray-200 shadow-sm rounded-lg">
                            <div className="flex mb-2 text-[20px] font-bold"> 
                                <p className="flex-1 w-30">Overview</p>
                                <div className="flex-1">
                                        <p>Budget utilization</p>
                                        <p className="inline text-[15px] font-normal">{selectedProject.spentBudget} € / {selectedProject.totalBudget} €</p>
                                        <div className="max-w-150 bg-[#68D391] border border-gray-200 py-1 rounded-lg"></div>

                                </div>
                            </div>
                            <div className="flex justify-between max-w-100 items-center mb-8 text-[15px] text-gray-500">
                                <div>
                                    <p className="text-[14px]">Global budget</p>
                                    <p className="text-black font-bold text-[18px]">{selectedProject.totalBudget} €</p>
                                </div>
                                <div>
                                    <p className="text-[14px]">Current expenses</p>
                                    <p className="text-black font-bold text-[18px]">{selectedProject.spentBudget} €</p>
                                </div>
                            </div>
                            <div className="flex justify-between max-w-100 items-center text-[15px] text-gray-500">
                                <div>
                                    <p className="text-[14px]">Categories</p>
                                    <p className="text-black font-bold text-[18px]">{selectedProject.categories.length} </p>
                                </div>
                            </div>
                    </Box>
                    {selectedProject?.categories && <CategoriesList id={id} OnClick={()=>setShowCreateCategorie(true)}/>}
                    <TasksList id={id} />
            </Box>
    )
}