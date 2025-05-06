import { useEffect, useId, useState } from "react"
import { useUserStore } from "../../../store/useUserStore.js";
import { Box } from "../../ui/container/Box.jsx";
import { CreateBtn } from "../../ui/button/CreateBtn.jsx";
import { DeleteBtn } from "../../ui/button/DeleteBtn.jsx";

export function CreateProject({OnClose}) {
    // State management
    const allProjects= useUserStore(state=>state.projects)
    const addProject= useUserStore(state=> state.addProject)
    const editValue = useUserStore(state=>state.editValue )

    // Main variables, project content and errors
    const [project,setProject]=useState({
        id:crypto.randomUUID(),
        name:"",
        totalBudget:"",
        remainingBudget:"",
        spentBudget:"0",
        categories:[],
        tasks:[],
        status:{
            id:"1TD",
            activity:"To do", 
            color:"bg-gray-400",
        }
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
        }else if (data.totalBudget[0] === "0" && data.totalBudget.length !==1 || data.totalBudget.includes('-')){
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
            editValue(project,"remainingBudget",project.totalBudget)
            OnClose()
        }
    }

    // data for inputs
    const dataInputs=[
        {
            labelName:"Title of project",
            forHtml:"name",
            type:"text",
            id:`name`,
            field:"name",
            placeholder:"Ex : Build an house"
        },
        {
            labelName:"Global budget (€)",
            forHtml:"totalBudget",
            type:"number",
            id:`totalBudget`,
            field:"totalBudget",
            placeholder:"Ex : 10000"
        }
    ]


    // Return JSX
    return (
             <Box w={"100"} h={"80"} className="border text-black border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center max-w-100">
                        <h1 className="text-lg font-bold mr-5">New project</h1>
                        <DeleteBtn OnClick={()=>OnClose()} value="X" className={'ml-auto opacity-50 hover:opacity-100'}/>
                        </div>
                            {dataInputs.map(item =>(
                                <div className="my-2 p-2" key={item.id}>
                                    {item.type==="number"? (<>
                                        
                                            <label className="block mb-2 text-[15px] font-bold" htmlFor={item.forHtml}>{item.labelName}</label>
                                            <input 
                                                className="border p-1 border-gray-200 rounded-lg w-80 focus:outline-2 focus:outline-offset-2 focus:outline-[#38B2AC]"
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

                                        <label className="block mb-1 text-[15px] font-bold" htmlFor={item.forHtml}>{item.labelName} </label>
                                            <input 
                                                className="border p-1 border-gray-200 rounded-lg w-80 focus:outline-2 focus:outline-offset-2 focus:outline-[#38B2AC]"
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
                                        <span className="block text-[12px] mt-1 text-red-400 ">{errors[item.field]}</span>
                                    )}
                        </div>
                            ))}
                        <div className="mt-7 text-right max-w-100">
                            <CreateBtn OnClick={handleSubmit} Value={"Create"} className={'px-4 py-2 bg-[#38B2AC] hover:bg-[#2C7A7B] rounded-lg text-white font-bold'} />
                        </div>  
            </Box>
    )
        

}