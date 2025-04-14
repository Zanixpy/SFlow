import { useStore } from "../../store.js"
import { CreateStatus } from "./CreateStatus.jsx"

export function CreateProjectDetails({id}) {
    const DisplayProject = useStore(state=>state.projects)
    
    return (
        <>
        <div className=" min-h-screen ">
            <div className="m-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="flex-1 text-[40px] text-black underline">{DisplayProject[id].Nom}</h1>
                    <input className="ml-auto border-1 px-5 py-2 rounded-sm text-[20px] bg-red-500 text-white" type="button" value="X"/>
                </div>
                <div className="flex items-center my-20">
                    <div className="text-center min-h-[200px] min-w-[200px] border-1 rounded-full p-10">
                        <p>Budget Total :</p>
                        <p className="text-[30px]">{DisplayProject[id].BudgetTotal}€</p>
                        <p className="text-[15px] mt-5" >Budget restant : {DisplayProject[id].BudgetRestant} </p>
                    </div>
                </div> 
            </div>
        </div>
        <CreateStatus/>
        </>

    )
}