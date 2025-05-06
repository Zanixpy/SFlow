import { Box } from "../../ui/container/Box";
import { useUserStore } from "../../../store/useUserStore";
import { CreateBtn } from "../../ui/button/CreateBtn";
import { DeleteBtn } from "../../ui/button/DeleteBtn";
import { useState } from "react";

export function CreateTask({id,OnClose}) {
    // State Management
    const allProjects = useUserStore((state) => state.projects)
    const updateProject = useUserStore((state) => state.updateProjectBudget)
    const selectedProject = allProjects[id]
    const categoriesName = selectedProject.categories && selectedProject.categories.map(item=>item.name)

    // Main variables, colors, categorie content and errors
    const [task, setTask] = useState({
        id: crypto.randomUUID(),
        name: "",
        categorie: "",
      })
    
      const [errors, setErrors] = useState({
        name: "",
        categorie:"",
   
      })
      const validateTask = (data) => {
        const newErrors = {
          name: "",
            categorie:"",

        }
    
        const testNameAvailable = selectedProject.task && selectedProject.task.some(item=> item.name === data.name)
    
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
    
        return newErrors;
      }

      const handleChange = (e, field) => {
        const value = e.target.value
        setTask((prev) => ({ ...prev, [field]: value }));
      }

      const handleSubmit = async (e) => {

        e.preventDefault()
        const newErrors = validateTask(task)
    
        setErrors(newErrors)
        const hasErrors = Object.values(newErrors).some((error) => error !== "")
    
        if (hasErrors === false) {
          await new Promise((resolve) => setTimeout(resolve, 300))  
          OnClose()
        }   
      }

       // data for inputs
  const dataInputs = [
    {
      labelName: "Title of task",
      forHtml: "name",
      type: "text",
      id: "name",
      field: "name",
      placeholder: "Ex : Buy a car",
    },
    {
      labelName: "Link categorie",
      forHtml: "categorie",
      type: "select",
      contenu: categoriesName,
      id: "categorie",
      field: "categorie",
    },
    {
      labelName:"Create",
      type:"submit",
      id:"create",
      field:"maxCategories"
    }
  ]


  return (
    <Box w={"100"} h={"80"} className="border text-black border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center max-w-100 mb-5">
        <h1 className="text-lg font-bold">New task</h1>
        <DeleteBtn OnClick={OnClose} value="X" className={'ml-auto text-gray-600 hover:text-gray-800 transition-colors'} />
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
                        value={task[item.field]}
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
           
            ) : item.type === "select" ? (<>
                    <label className="mr-5 text-[15px] font-bold" htmlFor={item.forHtml}>{item.labelName} :</label>
                    <select
                      className='border p-1 border-gray-200 rounded-lg w-50 focus:outline-2 focus:outline-offset-2 focus:outline-[#38B2AC]'
                      name={item.field}
                      id={item.forHtml}
                      value={task[item.field]}
                      onChange={(e) => handleChange(e, item.field)}
                    >
                      <option value="None">None</option>
                      {item.contenu.map((item) => (
                        <option value={item.name} key={item.name}>
                          {item}
                        </option>
                      ))}
                    </select>

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