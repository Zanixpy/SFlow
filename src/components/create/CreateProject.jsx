import { useEffect, useId, useState } from "react"
import { useUserStore } from "../../store/useUserStore.js";
import { CreateButton } from "../ui/CreateButton.jsx";
import { DeleteButton } from "../ui/DeleteButton.jsx";
import { Box } from "../ui/Box.jsx";

export function CreateProject({OnClose}) {
    const AddProject= useUserStore(state=> state.addProject)
    const DisplayProject= useUserStore(state=>state.projects)
    const [Project,setProject]=useState({
        ID:crypto.randomUUID(),
        Nom:"",
        BudgetTotal:"",
        BudgetRestant:0,
        Categories:[],
        Task:[],
        status:""

    })
   
    const [errors, setErrors]= useState({
        Nom:"",
        BudgetTotal:""
    })
    
    const ValidateProject = (data)=> {
        const newErrors={
            Nom:"",
            BudgetTotal:""
        }
        const ProjectNom= DisplayProject.map(item=>item.Nom)
        const test= ProjectNom.includes(data.Nom)

        if (!data.Nom) {
            newErrors.Nom="Le nom du project est requis"            
        }   else if (data.Nom.length > 25) {
            newErrors.Nom="Le nom du project doit être inférieure à 25 lettres"      
        }else if(test){
            newErrors.Nom="Ce nom de projet existe déjà"      
        }
        

        if (!data.BudgetTotal || data.BudgetTotal==="0") {
            newErrors.BudgetTotal="Le budget du project est requis"
        }else if (data.BudgetTotal[0]==="0" || data.BudgetTotal<0 || data.BudgetTotal.includes("e") ){
            newErrors.BudgetTotal="Veuillez rentrer un budget valide"
        }
    
        return newErrors
    }

    const handleChange=(e,field)=> {
        const value = e.target.value.trim()
        setProject(prev=> ({...prev,[field]:value}))

    }

    const handleSubmit = async e => {
        e.preventDefault()
        const newErrors= ValidateProject(Project)
        setErrors(newErrors)
        const hasErrors= Object.values(newErrors).some(error => error !== "")
        if (hasErrors===false) {
            await new Promise(resolve=>setTimeout(resolve,300))
            AddProject(Project)
            OnClose()
        }
        console.log(DisplayProject)

    }

    const ProjectField=[
        {
            labelName:"Nom",
            forHtml:"nom",
            type:"text",
            id:`nom`,
            field:"Nom",
            placeholder:"Entre le nom du projet"
        },
        {
            labelName:"Budget",
            forHtml:"budget-total",
            type:"number",
            id:`budget`,
            field:"BudgetTotal",
            placeholder:"Entre le budget du projet"

        }
    ]


    return (
             <Box w={"100"} className="bg-white">
                    <div className="flex items-center max-w-100">
                        <h1 className="text-lg font-bold mr-5">New project</h1>
                        <DeleteButton OnClick={()=>OnClose()}/>
                        </div>
                            {ProjectField.map(item => (
                                <div className="my-5 max-w-100 p-2 " key={item.id}>
                                    <label className="mr-5" htmlFor={item.forHtml}>{item.labelName} :</label>
                                    <input 
                                        className="underline"
                                        type={item.type}
                                        id={item.forHtml}
                                        value={Project[item.field]}
                                        onChange={e=>handleChange(e,item.field)}
                                        placeholder={item.placeholder}
                                    />
                                    {errors[item.field] && (
                                        <span className="block text-sm mt-1 text-red-400 ">{errors[item.field]}</span>
                                    )}
                        </div>
                            ))}
                        <div className="mt-7 text-right max-w-100">
                            <CreateButton OnClick={handleSubmit} Value={"Create"} />
                        </div>  
            </Box>
    )
        

}