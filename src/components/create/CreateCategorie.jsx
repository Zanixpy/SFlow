import { useEffect, useId, useState } from "react";
import { useUserStore } from "../../store/useUserStore.js";
import { CreateButton } from "../ui/CreateButton.jsx";
import { DeleteButton } from "../ui/DeleteButton.jsx";
import { Box } from "../ui/Box.jsx";


export function CreateCategorie({ id, OnClose,  }) {

  // State Management
  const allProjects = useUserStore((state) => state.projects)
  const updateProject = useUserStore((state) => state.updateProjectBudget)
  const addCategorie = useUserStore((state)=> state.addCategorie)
  const selectedProject = allProjects[id]

  // Main variables, colors, categorie content and errors
  const [colorVal, setcolorVal] = useState({
    availble: [
      { color: "green", idColor: "0g" },
      { color: "pink", idColor: "1p" },
      { color: "yellow", idColor: "2y" },
      { color: "orange", idColor: "3o" },
      { color: "purple", idColor: "4p" },
      { color: "red", idColor: "5r" },
      { color: "blue", idColor: "6b" },
      { color: "gray", idColor: "7g" },
    ],
    unavailable: [],
  })

  const [categorie, setCategorie] = useState({
    id: crypto.randomUUID(),
    name: "",
    totalBudget: "",
    color: "",
    task: [],
  })

  const [errors, setErrors] = useState({
    name: "",
    totalBudget: "",
    color: "",
    maxCategories:"",
  })

  // Function to check errors for categories inputs
  const validateCategorie = (data) => {
    const newErrors = {
      name: "",
      totalBudget: "",
      color: "",
      maxCategories:"",

    };

    const testColorAvailable = selectedProject.categories && selectedProject.categories.some(item => item.color === data.color )
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
    } else if (data.totalBudget[0] === "0" ) {
      newErrors.totalBudget = "Please enter a valid sub-budget"
    } else if (
      parseInt(data.totalBudget) > parseInt(selectedProject.remainingBudget)
    ) {
      newErrors.totalBudget = "The allocated sub-budget cannot exceed the project budget."
    }

    if (!colorVal.availble.some(item=>item.color === data.color)) {
      newErrors.color = "Select a color that is acceptable"
    } else if (testColorAvailable){
      newErrors.color = "This color is already taken"
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
      OnClose()
      updateProject(selectedProject)
    }
    
  }

  // data for inputs
  const dataInputs = [
    {
      labelName: "Name",
      forHtml: "name",
      type: "text",
      id: "name",
      field: "name",
      placeholder: "Enter the name",
    },
    {
      labelName: "Budget",
      forHtml: "totalBudget",
      type: "number",
      id: "totalBudget",
      field: "totalBudget",
      placeholder: "Enter the sub-budget",
    },
    {
      labelName: "Color",
      forHtml: "color",
      type: "select",
      Contenu: colorVal.availble,
      id: "color",
      field: "color",
      placeholder: "Enter the color",
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
    <Box w={"100"} h={"80"} className="bg-white">
      <div className="flex items-center max-w-100 mb-5">
        <h1 className="text-lg font-bold">New categorie</h1>
        <DeleteButton OnClick={OnClose} />
      </div>
      <div>
        {dataInputs.map((item) => (
          <div className="mb-1 max-w-100 p-2" key={item.id}>
              {item.type === "text" ? (<>

                    <label className="mr-5" htmlFor={item.forHtml}>{item.labelName} :</label>
                    <input
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

                    <label className="mr-5" htmlFor={item.forHtml}>{item.labelName} :</label>
                    <input
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
            </>) : item.type === "select" ? (<>
                    <label className="mr-5" htmlFor={item.forHtml}>{item.labelName} :</label>
                    <select
                      name={item.field}
                      id={item.forHtml}
                      value={categorie[item.field]}
                      onChange={(e) => handleChange(e, item.field)}
                    >
                      <option value="None">Choose a color</option>
                      {item.Contenu.map((color) => (
                        <option value={color.color} key={color.idColor}>
                          {color.color}
                        </option>
                      ))}
                    </select>

            </>) : (
              <div className="mt-7 text-right max-w-100">
                <CreateButton OnClick={handleSubmit} Value={item.labelName} />
              </div>
            )}
            {errors[item.field] && (
              <span className="block mt-1 text-red-400">
                {errors[item.field]}
              </span>
            )}
          </div>
        ))}
      </div>
    </Box>
  )
}
