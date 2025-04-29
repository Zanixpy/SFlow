import { useEffect, useId, useState } from "react"
import { useUserStore } from "../../store/useUserStore.js";
import { CreateButton } from "../ui/CreateButton.jsx";
import { DeleteButton } from "../ui/DeleteButton.jsx";
import { Box } from "../ui/Box.jsx";

export function CreateProject({OnClose}) {
    // State management
    const AddProject= useUserStore(state=> state.addProject)
    const DisplayProject= useUserStore(state=>state.projects)

    // Main variables, project content and errors
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


    // Function to check errors
    const ValidateProject = (data)=> {
        const newErrors={
            Nom:"",
            BudgetTotal:""
        }

        const TestNomAvaible= DisplayProject.some(item=>item.Nom === data.Nom)

        if (!data.Nom) {
            newErrors.Nom="The name of project is required"            
        }   else if (data.Nom.length > 25) {
            newErrors.Nom="The name of project must be less than 25 characters"      
        }else if(TestNomAvaible){
            newErrors.Nom="This name already exist"      
        }
        

        if (!data.BudgetTotal || data.BudgetTotal==="0") {
            newErrors.BudgetTotal="The budget is required"
        }else if (data.BudgetTotal[0]==="0" || data.BudgetTotal<0 || data.BudgetTotal.includes("e") ){
            newErrors.BudgetTotal="Please enter a valid budget"
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

    // data for inputs
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

    // Return JSX
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