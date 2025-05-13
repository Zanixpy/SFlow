import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore.js";
import { CreateBtn } from "../../ui/button/CreateBtn.jsx";
import { DeleteBtn } from "../../ui/button/DeleteBtn.jsx";
import { Box } from "../../ui/container/Box.jsx";


export function CreateCategorie({ id, OnClose,  }) {

  // State Management
  const allProjects = useUserStore((state) => state.projects)
  const updateProject = useUserStore((state) => state.updateProjectBudget)
  const editValue= useUserStore((state)=>state.editValueCategorie)
  const addCategorie = useUserStore((state)=> state.addCategorie)
  const selectedProject = allProjects[id]

  // Main variables, colors, categorie content and errors
  const [categorie, setCategorie] = useState({
    id: crypto.randomUUID(),
    name: "",
    totalBudget: "",
    remainingBudget:"",
    spentBudget:0,
    tasks: [],
    pourcent:0
  })

  const [errors, setErrors] = useState({
    name: "",
    totalBudget: "",
    maxCategories:"",
  })

  // Function to check errors for categories inputs
  const validateCategorie = (data) => {
    const newErrors = {
      name: "",
      totalBudget: "",
      maxCategories:"",

    };

    const testNameAvailable = selectedProject.categories && selectedProject.categories.some(item=> item.name === data.name)

    //Verifier le nom de la catégorie//
    if (!data.name) {
      newErrors.name = "The name is required";
    } else if (data.name.length > 25) {
      newErrors.name = "The name must be less than 25 characters";
    } else if (testNameAvailable) {
      newErrors.name = "The name already exist";
    } else if (selectedProject.name===data.name){
      newErrors.name = "You can't use the name of project";
    }

    //Verifier le Budget de la categorie//
    if (!data.totalBudget) {
      newErrors.totalBudget = "The sub-budget is required";
    } else if (data.totalBudget[0] === "0" && data.totalBudget.length !==1 || data.totalBudget.includes('-')) {
      newErrors.totalBudget = "Please enter a valid sub-budget"
    } else if (
      parseInt(data.totalBudget) > parseInt(selectedProject.remainingBudget)
    ) {
      newErrors.totalBudget = "The allocated sub-budget cannot exceed the project budget."
    }

    if (selectedProject.categories.length===8) {
      newErrors.maxCategories = "You have reached the maximum number of categories"
    }

    return newErrors;
  }

  // Handle the change of value on input
  const handleChange = (e, field) => {
    const value = e.target.value
    setCategorie((prev) => ({ ...prev, [field]: value }));
  }

  // Handle the submit of "categorie form"
  const handleSubmit = async (e) => {

    e.preventDefault()
    const newErrors = validateCategorie(categorie)

    setErrors(newErrors)
    const hasErrors = Object.values(newErrors).some((error) => error !== "")

    if (hasErrors === false) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      addCategorie(selectedProject,categorie)
      editValue(selectedProject,categorie,"remainingBudget",categorie.totalBudget)
      updateProject(selectedProject)
      OnClose()
    }
    
  }

  // data for inputs
  const dataInputs = [
    {
      labelName: "Title of categorie",
      forHtml: "name",
      type: "text",
      id: "name",
      field: "name",
      placeholder: "Ex : Transports",
    },
    {
      labelName: "Sub-budget (€)",
      forHtml: "totalBudget",
      type: "number",
      id: "totalBudget",
      field: "totalBudget",
      placeholder: "Ex : 4000",
    },
    {
      labelName:"Create",
      type:"submit",
      id:"create",
      field:"maxCategories"
    }
  ]

  // Return JSX
  return (
    <Box w={"100"} h={"80"} className="border text-black border-gray-200 z-8 rounded-lg shadow-sm">
      <div className="flex items-center max-w-100 mb-5">
        <h1 className="text-lg font-bold">New categorie</h1>
        <DeleteBtn OnClick={OnClose} value="X" className={'ml-auto text-gray-600 hover:text-gray-800'} />
      </div>
      <div>
        {dataInputs.map((item) => (
          <div className="my-2 p-2" key={item.id}>
              {item.type === "text" ? (<>

                    <label className="block mb-2 text-[15px] font-bold" htmlFor={item.forHtml}>{item.labelName}</label>
                    <input
                        className="border p-1 border-gray-200 rounded-lg w-80 focus:outline-2 focus:outline-offset-2 focus:outline-[#38B2AC]"
                        type={item.type}
                        id={item.forHtml}
                        value={categorie[item.field]}
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
                        onChange={(e) => handleChange(e, item.field)}
                        placeholder={item.placeholder}
                    />  

              </>
           
            ) : item.type==="number"? (<>

                    <label className="block mb-2 text-[15px] font-bold" htmlFor={item.forHtml}>{item.labelName}</label>
                    <input
                      className="border p-1 border-gray-200 rounded-lg w-80 focus:outline-2 focus:outline-offset-2 focus:outline-[#38B2AC]"
                      type={item.type}
                      id={item.forHtml}
                      value={categorie[item.field]}
                      onKeyDown={(e)=> {
                        if (e.key==='e'|| e.key==='E' || e.key==='+' || e.key==='-') {
                            e.preventDefault()
                        }
                      }}
                      onChange={(e) => handleChange(e, item.field)}
                      placeholder={item.placeholder}
                    />  
            </>) : (
              <div className="mt-2 text-right max-w-100">
                <CreateBtn OnClick={handleSubmit} Value={item.labelName} className={'px-4 py-2 bg-[#38B2AC] hover:bg-[#2C7A7B] rounded-lg text-white font-bold'} />
              </div>
            )}
            {errors[item.field] && (
              <span className="block text-[12px] mt-1 text-red-400">
                {errors[item.field]}
              </span>
            )}
          </div>
        ))}
      </div>
    </Box>
  )
}
