import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/useUserStore.js"
import { DeleteButton } from "../ui/DeleteButton.jsx"

export function CreateProjectDetails({id}) {
    const DisplayProject = useUserStore(state=>state.projects)
    const RemoveProject = useUserStore(state=>state.RemoveProject)
    const navigate= useNavigate()
    const OnDelete=()=>{
        RemoveProject(DisplayProject[id])
        navigate(-1)
    }
    
    return (
        <>
        <div className=" min-h-screen ">
            <div className="m-4 p-4">
                <div className="flex items-center justify-between ">
                    <h1 className="text-[40px] text-black underline">{DisplayProject[id] && DisplayProject[id].Nom}</h1>
                    <DeleteButton OnClick={OnDelete} px={"5"} py={"2"} font_size="20" />  
                </div>
                <div className="flex items-center my-20">
                    <div className="text-center min-h-[200px] min-w-[200px] border-1 rounded-full p-10">
                        <p>Budget Total :</p>
                        <p className="text-[30px]">{DisplayProject[id] && DisplayProject[id].BudgetTotal}€</p>
                        <p className="text-[15px] mt-5" >Budget restant : {DisplayProject[id] && DisplayProject[id].BudgetRestant} </p>
                    </div>
                </div> 
            </div>
        </div>
        </>

    )
}