import { useEffect, useId, useState } from "react"
import { useStore } from "../store"

export function CreateCategorie() {
    const AddProject= useStore(state=> state.addProject)
    const DisplayProject= useStore(state=>state.projects)
    const [IsDone,setIsDone]= useState(true)
    const [Categorie,setCategorie]=useState({
        ID:crypto.randomUUID(),
        ProjetLink:"",
        Nom:"",
        BudgetTotal:"",
        BudgetRestant:0,
        Color:"",
        Task:[]
    })
   
    const [errors, setErrors]= useState({
        Nom:"",
        BudgetTotal:"",
        Color:""
    })
    
    const ValidateCategorie = (data)=> {
        const newErrors={
            Nom:"",
            BudgetTotal:"",
            Color:""

        }
        const CategorieNom= DisplayProject.map(item=>item.Categories.Nom)
        const CategorieColor= DisplayProject.map(item=>item.Categories.Color)
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
            setIsDone(true)

        }
        console.log(DisplayProject)
    }

    const ProjectField=[
        {
            labelName:"Nom",
            forHtml:"nom",
            type:"text",
            id:`1-nom`,
            field:"Nom",
            placeholder:"Entre le nom de la catégorie"
        },
        {
            labelName:"Budget",
            forHtml:"budget-total",
            type:"number",
            id:`0-budget`,
            field:"BudgetTotal",
            placeholder:"Entre le budget de cette catégorie"

        },
        {
            labelName:"Budget",
            forHtml:"budget-total",
            type:"number",
            id:`0-budget`,
            field:"BudgetTotal",
            placeholder:"Entre le budget du projet"

        }
    ]


    return (
            <div className="flex items-center">
                    {IsDone && (
                        <>
                            <div className="m-8 p-10 max-h-100 max-w-100 rounded-xs border-1 ">
                            <h1 className="mb-5 text-lg font-bold">New categorie</h1>
                            {ProjectField.map(item => (
                                <div className="mb-2 p-2 " key={item.id}>
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

                        </>
                    )}

            </div>
    )
        

}