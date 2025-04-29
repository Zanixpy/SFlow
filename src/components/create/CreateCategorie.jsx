import { useEffect, useId, useState } from "react";
import { useUserStore } from "../../store/useUserStore.js";
import { CreateButton } from "../ui/CreateButton.jsx";
import { DeleteButton } from "../ui/DeleteButton.jsx";
import { Box } from "../ui/Box.jsx";

export function CreateCategorie({ id, OnClose }) {

  // State Management
  const DisplayProject = useUserStore((state) => state.projects)
  const ProjectTarget = DisplayProject[id]

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

  const [Categorie, setCategorie] = useState({
    ID: crypto.randomUUID(),
    ProjetLink: "",
    Nom: "",
    BudgetTotal: "",
    BudgetRestant: 0,
    Color: "",
    Task: [],
  })

  const [errors, setErrors] = useState({
    Nom: "",
    BudgetTotal: "",
    Color: "",
    CreateMax:"",
  })

  // Function to check errors for categories inputs
  const ValidateCategorie = (data) => {
    const newErrors = {
      Nom: "",
      BudgetTotal: "",
      Color: "",
      CreateMax:"",

    };

    const TestColorAvailable = ProjectTarget.Categories && ProjectTarget.Categories.some(item => item.Color === data.Color )
    const TestNameAvailable = ProjectTarget.Categories && ProjectTarget.Categories.some(item=> item.Nom === data.Nom)

    //Verifier le nom de la catégorie//
    if (!data.Nom) {
      newErrors.Nom = "Category's name is required";
    } else if (data.Nom.length > 25) {
      newErrors.Nom = "Category's name must be less than 25 characters";
    } else if (TestNameAvailable) {
      newErrors.Nom = "This name already exist";
    }

    //Verifier le Budget de la categorie//
    if (!data.BudgetTotal) {
      newErrors.BudgetTotal = "Category's sub-budget is required";
    } else if (
      data.BudgetTotal[0] === "0" ||
      parseInt(data.BudgetTotal) < 0 ||
      data.BudgetTotal.includes("e")
    ) {
      newErrors.BudgetTotal = "Please enter a valid sub-budget"
    } else if (
      parseInt(data.BudgetTotal) > parseInt(ProjectTarget.BudgetTotal)
    ) {
      newErrors.BudgetTotal =
        "The allocated sub-budget cannot exceed the project budget."
    }

    if (!colorVal.availble.some(item=>item.color === data.Color)) {
      newErrors.Color = "Select a color that is acceptable"
    } else if (TestColorAvailable){
      newErrors.Color = "This color is already taken"
    }


    if (ProjectTarget.Categories.length===8) {
      newErrors.CreateMax = "You have reached the maximum number of categories"
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
    e.preventDefault();
    const newErrors = ValidateCategorie(Categorie);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors === false) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      Categorie.ProjetLink = ProjectTarget.ID;
      if (colorVal.availble.some(item => item.color === Categorie.Color)) {
        // Trouver l'objet couleur sélectionné
        const selectedColor = colorVal.availble.find(item => item.color === Categorie.Color);    
        // Mettre à jour l'état avec la nouvelle répartition des couleurs
        setcolorVal(prevState => ({
          availble: prevState.availble.filter(item => item.color !== Categorie.Color),
          unavailable: [...prevState.unavailable, selectedColor]
        }));
      }
      ProjectTarget.Categories.push(Categorie);
      OnClose();
    }
    console.log(ProjectTarget);
  }

  // data for inputs
  const CategorieField = [
    {
      labelName: "Nom",
      forHtml: "nom",
      type: "text",
      id: `nom`,
      field: "Nom",
      placeholder: "Enter category's name",
    },
    {
      labelName: "Budget",
      forHtml: "budget-total",
      type: "number",
      id: `budget`,
      field: "BudgetTotal",
      placeholder: "Enter sub-budget's name",
    },
    {
      labelName: "Color",
      forHtml: "categorie-color",
      type: "select",
      Contenu: colorVal.availble,
      id: `color`,
      field: "Color",
      placeholder: "Enter category's color",
    },
    {
      labelName:"Create",
      type:"submit",
      id:"create",
      field:"CreateMax"
    }
  ]

  // Return JSX
  return (
    <Box w={"100"} className="bg-white">
      <div className="flex items-center max-w-100 mb-5">
        <h1 className="text-lg font-bold">New categorie</h1>
        <DeleteButton OnClick={OnClose} />
      </div>
      <div>
        {CategorieField.map((item) => (
          <div key={item.id}>
            {item.type === "text" || item.type === "number" ? (
              <div className="mb-1 max-w-100 p-2">
                <label className="mr-5" htmlFor={item.forHtml}>
                  {item.labelName} :
                </label>
                <input
                  type={item.type}
                  id={item.forHtml}
                  value={Categorie[item.field]}
                  onChange={(e) => handleChange(e, item.field)}
                  placeholder={item.placeholder}
                />
              </div>
            ) : item.type === "select" ? (
              <div className="mb-1 max-w-100 p-2">
                <label className="mr-5" htmlFor={item.forHtml}>
                  {item.labelName} :
                </label>
                <select
                  name={item.field}
                  id={item.forHtml}
                  value={Categorie[item.field]}
                  onChange={(e) => handleChange(e, item.field)}
                >
                  <option value="None">Choose a color</option>
                  {item.Contenu.map((color) => (
                    <option value={color.color} key={color.idColor}>
                      {color.color}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
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
