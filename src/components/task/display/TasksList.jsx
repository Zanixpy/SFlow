import { Box } from "../../ui/container/Box";
import { DeleteBtnV2 } from "../../ui/button/DeleteBtnV2";
import { useUserStore } from "../../../store/useUserStore";

export function TasksList({id,categorieIndex=null}) {
    const allProjects = useUserStore(state=>state.projects)
    const removeTask = useUserStore(state=> state.removeTask)
    const updateCategorieBudget = useUserStore((state)=>state.updateCategorieBudget)
    const editValue = useUserStore((state)=>state.editValueTask)
    const selectedProject = allProjects[id]
    const selectedCategorie = selectedProject.categories[categorieIndex]

    const onDelete= async (item) => {
        await new Promise(resolve=>setTimeout(resolve,200))
        removeTask(selectedProject,selectedCategorie,item)
        const updatedCategorie = {
            ...categorie,
            tasks: selectedCategorie.tasks.filter(ts => ts.id !== item.id)
          };
        updateCategorieBudget(selectedProject,updatedCategorie)        
    }

    const handleChange = (item) => {
      editValue(selectedProject,selectedCategorie,item,"checked",!item.checked)
    }

    return ( <Box w={"340"} h={"150"} >  
    <div className="flex items-center">
        {selectedCategorie.tasks && selectedCategorie.tasks.map(item=>
          <Box h={"20"} w={"270"} padding="px-4 py-3" margin="m-0" className="border border-gray-200 shadow-xs rounded-lg" key={item.id}>
            <div className="flex justify-between items-center mb-5 p-2">
                        <input 
                            type="checkbox" 
                            value={item.checked}
                            onChange={()=>handleChange(item)}
                            className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded bg-white checked:bg-blue-600 checked:border-blue-600 transition-colors "
                           
                        />
                        <p>{item.name}</p>
                        <DeleteBtnV2 onClick={()=>onDelete(item)}/>    
            </div>
         </Box>
        )}
        </div>
</Box>)
    
}