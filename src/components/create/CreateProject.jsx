import { useEffect, useId, useState } from "react"
import { useUserStore } from "../../store/useUserStore.js";
import { CreateButton } from "../ui/CreateButton.jsx";
import { DeleteButton } from "../ui/DeleteButton.jsx";
import { Box } from "../ui/Box.jsx";

export function CreateProject({OnClose}) {
    // State management
    const addProject= useUserStore(state=> state.addProject)
    const allProjects= useUserStore(state=>state.projects)

    // Main variables, project content and errors
    const [project,setProject]=useState({
        id:crypto.randomUUID(),
        name:"",
        totalBudget:"",
        remainingBudget:"",
        spentBudget:"",
        categories:[],
        categoriesBudget:"",
        task:[],
        status:""

    })
   
    const [errors, setErrors]= useState({
        name:"",
        totalBudget:""
    })


    // Function to check errors
    const validateProject = (data)=> {
        const newErrors={
            name:"",
            totalBudget:""
        }

        const nameIsHere = allProjects.some(item=>item.name === data.name)

        if (!data.name) {
            newErrors.name="The name of project is required"            
        }   else if (data.name.length > 25) {
            newErrors.name="The name of project must be less than 25 characters"      
        }else if(nameIsHere){
            newErrors.name="This name already exist"      
        }
        
        if (!data.totalBudget) {
            newErrors.totalBudget="The budget is required"
        }else if (data.totalBudget[0]==="0" || parseInt(data.totalBudget<0)){
            newErrors.totalBudget="Please enter a valid budget"
        }
    
        return newErrors
    }


    // Handle the change of value on input
    const handleChange=(e,field)=> {
        const value = e.target.value
        setProject(prev=> ({...prev,[field]:value}))

    }

    // Handle the submit of "project form"
    const handleSubmit = async e => {
        e.preventDefault()
        const newErrors= validateProject(project)
        setErrors(newErrors)
        const hasErrors= Object.values(newErrors).some(error => error !== "")
        if (hasErrors===false) {
            await new Promise(resolve=>setTimeout(resolve,300))
            addProject(project)
            OnClose()
        }
    }

    // data for inputs
    const dataInputs=[
        {
            labelName:"Name",
            forHtml:"name",
            type:"text",
            id:`name`,
            field:"name",
            placeholder:"Enter the name of project"
        },
        {
            labelName:"Budget",
            forHtml:"totalBudget",
            type:"number",
            id:`totalBudget`,
            field:"totalBudget",
            placeholder:"Enter the budget of project"
        }
    ]

    // Return JSX
    return (
             <Box w={"100"} className="bg-white">
                    <div onKeyDown={(e) => {
                            
                        }} 
                    className="flex items-center max-w-100">
                        <h1 className="text-lg font-bold mr-5">New project</h1>
                        <DeleteButton OnClick={()=>OnClose()}/>
                        </div>
                            {dataInputs.map(item =>(
                                <div className="my-5 max-w-100 p-2 " key={item.id}>
                                    {item.type==="number"? (<>
                                        
                                            <label className="mr-5" htmlFor={item.forHtml}>{item.labelName} :</label>
                                            <input 
                                                type={item.type}
                                                id={item.forHtml}
                                                value={project[item.field]}
                                                onKeyDown={(e)=> {
                                                    if (e.key==='e'|| e.key==='E' || e.key==='+' || e.key==='-') {
                                                        e.preventDefault()
                                                    }
                                                }}
                                                onChange={e=>handleChange(e,item.field)}
                                                placeholder={item.placeholder}
                                            />

                                    </>):(<>

                                        <label className="mr-5" htmlFor={item.forHtml}>{item.labelName} :</label>
                                            <input 
                                                type={item.type}
                                                id={item.forHtml}
                                                value={project[item.field]}
                                                onKeyDown={(e)=> {
                                                    const isValid = /^[a-zA-Z0-9 ]$/.test(e.key)
                                                    const controlKeys = [
                                                        'Backspace',
                                                        'Delete',
                                                        'ArrowLeft',
                                                        'ArrowRight',
                                                        'Tab'
                                                      ]
                                                    if (!isValid && !controlKeys.includes(e.key)) {
                                                        e.preventDefault()
                                                    }
                                                }}
                                                onChange={e=>handleChange(e,item.field)}
                                                placeholder={item.placeholder}
                                            />
                                    
                                    </>)}

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