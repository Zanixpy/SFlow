import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../../store/useUserStore.js"
import { Box } from "../../ui/container/Box.jsx"
import { DeleteBtnV1 } from "../../ui/button/DeleteBtnV1.jsx"
import { CategoriesList } from "../../category/display/CategoriesList.jsx"

export function ProjectInfo({id}) {

    // State Management
    const allProjects = useUserStore(state=>state.projects)
    const removeProject = useUserStore(state=>state.removeProject)
    const selectedProject = allProjects[id]

    // Variable
    const navigate= useNavigate()

    // Function on delete
    const onDeleteProject= async ()=>{
        await new Promise(resolve=>setTimeout(resolve,200))
        navigate("/projects")
        removeProject(selectedProject)
    }

   

    

    // Effect pour surveiller les changements de catégories

    // Return JSX
    
    return ( <Box w={"300"} h={"200"} padding="p-3" margin="mx-30 mt-4 mb-10" className="text-black">
                    <div className="mb-4 text-gray-500 text-[14px] hover:text-gray-700 cursor-pointer w-55 transitions-colors" onClick={()=>navigate("/projects")}>
                        <p><span className="text-[17px]">{'<'}-</span> Retour au tableau de bord</p>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-[40px] font-bold">{selectedProject?.name}</h1>
                        <DeleteBtnV1 onClick={onDeleteProject} value={'Delete'}/>
                    </div>
                    <Box w={"300"} h={"auto"} margin="my-4" padding="p-6" className="border-1 border-gray-200 shadow-sm rounded-lg">
                            <div className="flex flex-col md:flex-row gap-6"> 
                                <div className="flex-1">
                                    <p className="font-bold mb-3">Overview</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-500">
                                        <div className="w-full">
                                            <p className="text-[14px]">Global budget</p>
                                            <p className="text-black font-bold text-[18px]">{selectedProject?.totalBudget} €</p>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[14px]">Current expenses</p>
                                            <p className="text-black font-bold text-[18px]">{selectedProject?.spentBudget} €</p>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[14px]">Categories</p>
                                            <p className="text-black font-bold text-[18px]">{selectedProject?.categories.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold mb-3">Budget utilization</p>
                                    <div className="flex items-center justify-between text-[15px] mb-2">
                                        <p>
                                            {selectedProject?.spentBudget} € / {selectedProject?.totalBudget} €
                                        </p>
                                        <p className="text-gray-500">
                                            {Math.floor((selectedProject?.spentBudget / selectedProject?.totalBudget) * 100)} %
                                        </p>       
                                    </div>
                                    <div className="w-full border border-gray-200 p-1 rounded-lg">
                                        <div 
                                            className="bg-gradient-to-r from-[#38B2AC] to-[#68D391] p-1 rounded-lg transition-all duration-500"
                                            style={{ width: `${selectedProject?.pourcent || 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>           
                    </Box>
                    {selectedProject?.categories && <CategoriesList id={id} OnClick={()=>setShowCreateCategorie(true)}/>}
            </Box>
    )
}