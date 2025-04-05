import { useId, useState } from "react"


export function CreateProject() {
    const ProjectId=useId()
    const [Project,setProject]=useState({
        ID:null,
        Nom:null,
        BudgetTotal:0,
        BudgetRestant:null,
        Categories:[],
        Task:[]
    })

    const [errors, setErrors]= useState({
        Nom:null,
        BudgetTotal:0
    })
    
    const ValidateProject = (data)=> {
        const newErrors={
            Nom:null,
            BudgetTotal:0
        }

        if (!data.Nom) {
            newErrors.Nom="Le nom du project est requis"            
        }   else if (data.Nom.length > 25) {
            newErrors.Nom="Le nom du project doit être inférieure à 25 lettres"      
        }

        if (!data.BudgetTotal || data.BudgetTotal===0) {
            newErrors.BudgetTotal="Le budget du project est requis"
        }

        return newErrors
    }

    const handleChange=(e,field)=> {
        const value = e.target.value.trim()
        setProject(prev=> ({...prev,[field]:value}))

        const fieldError= ValidateProject({...whatever,[field]:value})
        setErrors(prev=>({...prev,[field]:fieldError}))

    }

    const ProjectField=[
        {
            labelName:"Nom",
            forHtml:"nom",
            type:"text",
            id:`${ProjectId}-nom`,
            field:"Nom",
            placeholder:"Entre le nom du projet"
        },
        {
            labelName:"Budget",
            forHtml:"budget-total",
            type:"number",
            id:`${ProjectId}-budget`,
            field:"BudgetTotal",
            placeholder:"Entre le budget du projet"

        }
    ]


    return (
            <div className="flex items-center">
                <div className="m-8 p-10 max-h-100 max-w-100 rounded-xs border-1 ">
                    <h1 className="mb-5 text-lg font-bold">New project</h1>
                    {ProjectField.map(item=>(
                            <div className="mb-2 p-2 border-2 rounded-sm" key={item.id}>
                                <label className="mr-5" htmlFor={item.forHtml}>{item.labelName} :</label>
                                <input 
                                    type={item.type}
                                    id={item.forHtml}
                                    value={Project[item.field]}
                                    onChange={e=>handleChange(e,item.field)}
                                    placeholder={item.placeholder}
                                />
                            </div>
                        ))}
                    <input className="mt-5 border-1 px-5 py-2 rounded-sm" type="button" value="Create" />

                </div>
            </div>
    )
        

}