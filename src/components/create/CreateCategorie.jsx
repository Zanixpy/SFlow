import { useEffect, useId, useState } from "react";
import { useUserStore } from "../../store/useUserStore.js";
import { CreateButton } from "../ui/CreateButton.jsx";
import { DeleteButton } from "../ui/DeleteButton.jsx";
import { Box } from "../ui/Box.jsx";

export function CreateCategorie({ id, OnClose }) {
  const DisplayProject = useUserStore((state) => state.projects);
  const ProjectTarget = DisplayProject[id];

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
  });

  const [Categorie, setCategorie] = useState({
    ID: crypto.randomUUID(),
    ProjetLink: "",
    Nom: "",
    BudgetTotal: "",
    BudgetRestant: 0,
    Color: "",
    Task: [],
  });

  const [errors, setErrors] = useState({
    Nom: "",
    BudgetTotal: "",
    Color: "",
  });

  const ValidateCategorie = (data) => {
    const newErrors = {
      Nom: "",
      BudgetTotal: "",
      Color: "",
    };

    const CategorieNom = DisplayProject.map((item) => item.Categories.Nom);
    const CategorieColor = DisplayProject.map((item) => item.Categories.Color);
    const test = CategorieNom.includes(data.Nom);

    //Verifier le nom de la catégorie//
    if (!data.Nom) {
      newErrors.Nom = "Category's name is required";
    } else if (data.Nom.length > 25) {
      newErrors.Nom = "Category's name must be less than 25 characters";
    } else if (test) {
      newErrors.Nom = "This name already exist";
    }

    //Verifier le Budget de la categorie//
    if (!data.BudgetTotal || data.BudgetTotal === "0") {
      newErrors.BudgetTotal = "Category's sub-budget is required";
    } else if (
      data.BudgetTotal[0] === "0" ||
      parseInt(data.BudgetTotal) < 0 ||
      data.BudgetTotal.includes("e")
    ) {
      newErrors.BudgetTotal = "Please enter a valid sub-budget";
    } else if (
      parseInt(data.BudgetTotal) > parseInt(ProjectTarget.BudgetTotal)
    ) {
      newErrors.BudgetTotal =
        "The allocated sub-budget cannot exceed the project budget.";
    }

    if (!colorVal.availble.some(item=>item.color === data.Color)) {
      newErrors.Color = "Select a color that is acceptable";
    } 

    return newErrors;
  };

  const handleChange = (e, field) => {
    const value = e.target.value.trim();
    setCategorie((prev) => ({ ...prev, [field]: value }));
  };

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
  };

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
  ];

  return (
    <Box w={"100"} className="bg-white">
      <div className="flex items-center max-w-100 mb-5">
        <h1 className="text-lg font-bold">New categorie</h1>
        <DeleteButton OnClick={OnClose} />
      </div>
      {CategorieField.map((item) => (
        <div className="mb-1 max-w-100 p-2  " key={item.id}>
          <label className="mr-5" htmlFor={item.forHtml}>
            {item.labelName} :
          </label>
          {item.type === "select" ? (
            <>
              <select
                name={item.field}
                id={item.forHtml}
                value={Categorie[item.field]}
                onChange={(e)=>handleChange(e,item.field)}
              >
                <option value="None">Choose a color</option>
                {item.Contenu.map((color) => (
                  <option value={color.color} key={color.idColor}>{color.color}</option>
                ))}
              </select>
            </>
          ) : (
            <>
              <input
                type={item.type}
                id={item.forHtml}
                value={Categorie[item.field]}
                onChange={(e) => handleChange(e, item.field)}
                placeholder={item.placeholder}
              />
            </>
          )}

          {errors[item.field] && (
            <span className="block mt-1 text-red-400 ">
              {errors[item.field]}
            </span>
          )}
        </div>
      ))}
      <div className="mt-7 text-right max-w-100">
        <CreateButton OnClick={handleSubmit} Value={"Create"} />
      </div>
    </Box>
  );
}
