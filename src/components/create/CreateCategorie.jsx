import { useEffect, useId, useState } from "react";
import { useStore } from "../../store";

export function CreateCategorie() {
  const AddProject = useStore((state) => state.addProject);
  const DisplayProject = useStore((state) => state.projects);
  const [IsDone, setIsDone] = useState(true);
  const [colorVal, setcolorVal] = useState({
    availble: [
      {color:"Vert",idColor:0},
      {color:"Rose",idColor:1},
      {color:"Jaune",idColor:2},
      {color:"Orange",idColor:3},
      {color:"Violet",idColor:4},
      {color:"Rouge",idColor:5},
      {color:"Bleu",idColor:6},
      {color:"Gris",idColor:7}
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
    const test = ProjectNom.includes(data.Nom);

    //Verifier le nom de la catégorie//
    if (!data.Nom) {
      newErrors.Nom = "Le nom du project est requis";
    } else if (data.Nom.length > 25) {
      newErrors.Nom = "Le nom du project doit être inférieure à 25 lettres";
    } else if (test) {
      newErrors.Nom = "Ce nom de projet existe déjà";
    }

    //Verifier le Budget de la categorie//
    if (!data.BudgetTotal || data.BudgetTotal === "0") {
      newErrors.BudgetTotal = "Le budget du project est requis";
    } else if (data.BudgetTotal[0] === "0" || data.BudgetTotal < 0) {
      newErrors.BudgetTotal = "Veuillez rentrer un budget valide";
    }

    return newErrors;
  };

  const handleChange = (e, field) => {
    const value = e.target.value.trim();
    setProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = ValidateProject(Project);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors === false) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      Project.ID = crypto.randomUUID();
      setIsDone(true);
    }
    console.log(DisplayProject);
  };

  const CategorieField = [
    {
      labelName: "Nom",
      forHtml: "nom",
      type: "text",
      id: `1-nom`,
      field: "Nom",
      placeholder: "Entre le nom de la catégorie",
    },
    {
      labelName: "Budget",
      forHtml: "budget-total",
      type: "number",
      id: `0-budget`,
      field: "BudgetTotal",
      placeholder: "Entre le budget de cette catégorie",
    },
    {
      labelName: "Color",
      forHtml: "categorie-color",
      type: "select",
      Contenu: colorVal.availble,
      id: `0-color`,
      idSelect: crypto.randomUUID(),
      field: "Color",
      placeholder: "Entre la couleur de la categorie",
    },
  ];

  return (
    <div className="flex items-center text-sm">
      {IsDone && (
        <>
          <div className="m-5 p-5 max-h-100 max-w-100 rounded-xs border-1 ">
            <h1 className="mb-5 text-lg font-bold">New categorie</h1>
            {CategorieField.map((item) => (
              <div className="mb-1 p-2  " key={item.id}>
                <label className="mr-5" htmlFor={item.forHtml}>
                  {item.labelName} :
                </label>
                {item.type === "select" ? (
                  <>
                    <select name={item.field} id={item.forHtml}>
                      <option value="">Choose a color</option>
                      {item.Contenu.map((color) => (
                        <option value={color.color} key={color.idColor} >{color.color}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <input
                      className="underline"
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
            <input
              className="mt-5 border-1 px-2 py-1 rounded-sm"
              type="button"
              value="Create"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
}
