import { useEffect, useId, useState } from "react"
import { useStore } from "../../store"

export function CreateProject({OnClose}) {
    const AddProject= useStore(state=> state.addProject)
    const DisplayProject= useStore(state=>state.projects)
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
        }else if (data.BudgetTotal[0]==="0" || data.BudgetTotal<0 ){
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
            Project.ID=crypto.randomUUID()
            OnClose()

        }
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
            <div className="flex items-center">
                    <div className="m-8 p-10 max-h-100 max-w-100 rounded-xs border-1 ">
                        <div className="flex items-center">
                            <h1 className="text-lg font-bold mr-5">New project</h1>
                            <input className="border-1 px-3 py-1 rounded-sm text-sm" type="button" value="X" onClick={()=>OnClose()} />
                        </div>
                            {ProjectField.map(item => (
                                <div className="my-5 p-2 " key={item.id}>
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
                            <input className="mt-5 border-1 px-5 py-2 rounded-sm" type="button" value="Create" onClick={handleSubmit} />
                            </div>
            </div>
    )
        

}