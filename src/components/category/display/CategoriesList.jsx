import { useUserStore } from "../../../store/useUserStore.js"
import { useState } from "react"
import { CreateBtn } from "../../ui/button/CreateBtn.jsx"
import { Box } from "../../ui/container/Box.jsx"
import { CategoriesCircleBox } from "../../ui/container/CategoriesCircleBox.jsx"
import { CreateCategorie } from "../create/CreateCategorie.jsx"

export function CategoriesList({id}) {
    const allProjects = useUserStore(state=>state.projects)
    const selectedProject = allProjects[id]

    const [showCreateCategorie, setShowCreateCategorie] = useState(false)


    return ( <Box w={"340"} h={"150"} >
                <div className="flex items-center">
                    <h1 className="mr-5 text-[25px] font-bold">Categories</h1>
                    <CreateBtn OnClick={()=>setShowCreateCategorie(true)} Value={"+"} />
                </div>  
            <div className="flex items-center">
            {selectedProject.categories && selectedProject.categories.map(item=>
                <CategoriesCircleBox h={"60"} w={"60"} padding="p-10" color={item.color} key={item.id}>
                    <div className="text-center max-w-100">
                                <p className="mb-2 text-[30px] font-bold ">{item.name}</p>
                                <div className="flex items-center">
                                    <p className="mr-2">Sub-budget :</p>
                                    <p className="text-[20px] font-bold" >{item.totalBudget}€</p>
                                </div>
                    </div>
                </CategoriesCircleBox>
            )}
            {showCreateCategorie && <CreateCategorie id={id} OnClose={()=>setShowCreateCategorie(false)}/>}
            </div>
        </Box>)
        
}