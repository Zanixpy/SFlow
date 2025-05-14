import { useUserStore } from "../../../store/useUserStore.js";
import { useState } from "react";
import { Box } from "../../ui/container/Box.jsx";
import { CreateCategorie } from "../create/CreateCategorie.jsx";
import { AddBtn } from "../../ui/button/AddBtn.jsx";
import { DeleteBtnV2 } from "../../ui/button/DeleteBtnV2.jsx";
import { CreateTask } from "../../task/create/CreateTask.jsx";
import { TasksList } from "../../task/display/TasksList.jsx";

export function CategoriesList({ id }) {
  const allProjects = useUserStore((state) => state.projects);
  const removeCategorie = useUserStore((state) => state.removeCategorie);
  const updateProject = useUserStore((state) => state.updateProjectBudget)
  const selectedProject = allProjects[id];

  const onDeleteCategorie = async (item) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    removeCategorie(selectedProject, item);
    const updatedProject = {
      ...selectedProject,
      categories: selectedProject.categories.filter(cat => cat.id !== item.id)
    };
    updateProject(updatedProject);
  };

  const [showCreateCategorie, setShowCreateCategorie] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showTasksList, setShowTasksList] = useState(false);

  const [activeCreateTaskIndex, setActiveCreateTaskIndex] = useState(null);
  const [activeTasksListIndex, setActiveTasksListIndex] = useState(null);

  return (
    <Box w={"300"} h={"auto"} padding="p-0" margin="my-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="mr-5 text-[25px] font-bold">Categories</h1>
        <AddBtn
          onClick={() => setShowCreateCategorie(true)}
          value={"+ New categorie"}
        />
      </div>
      <div className="space-y-4">
        {selectedProject.categories &&
          selectedProject.categories.map((item,index) => (
            <Box
              h={"auto"}
              w={"300"}
              padding="px-4 py-3"
              margin="mb-4"
              className="border border-gray-200 shadow-xs rounded-lg"
              key={item.id}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[18px] font-semibold">{item.name}</p>
                  <DeleteBtnV2
                    onClick={() => onDeleteCategorie(item)}
                    value={"Delete"}
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-[14px]">
                    {Math.floor(
                      (item.totalBudget / selectedProject.totalBudget) * 100
                    )}
                    % of global budget
                  </p>
                </div>
                <div className="flex items-center justify-between text-[15px]">
                  <p>
                    {item.spentBudget} € / {item.totalBudget} €
                  </p>
                  <p className="text-gray-500">
                    {Math.floor((item.spentBudget / item.totalBudget) * 100)} %
                  </p>
                </div>
                <div className="w-full border border-gray-200 p-1 rounded-lg">
                  <div 
                    className="bg-gradient-to-r from-[#38B2AC] to-[#68D391] p-1 rounded-lg transition-all duration-500"
                    style={{ width: `${item.pourcent || 0}%` }}
                  > 
                  </div>
                </div>
                
                <div className="flex items-center text-[14px] gap-2 pt-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveTasksListIndex(activeTasksListIndex === index ? null : index);
                      setShowTasksList(true);
                    }}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg px-2 py-1 cursor-pointer"
                  >
                    Display
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveCreateTaskIndex(activeCreateTaskIndex === index ? null : index);
                      setShowCreateTask(true);
                    }}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg px-2 py-1 cursor-pointer"
                  >
                    Create Task +
                  </button>
                </div>
              </div>
              <div className="mt-4">
                {(activeCreateTaskIndex === index && showCreateTask) && (
                  <CreateTask
                    id={id}
                    OnClose={() => {
                      setShowCreateTask(false);
                      setActiveCreateTaskIndex(null);
                    }}
                    categorieIndex={index}
                  />
                )}
                {(activeTasksListIndex === index && showTasksList) && item.tasks && (
                  <TasksList 
                    id={id} 
                    categorieIndex={index}
                    onClose={() => {
                      setShowTasksList(false);
                      setActiveTasksListIndex(null);
                    }}
                  />
                )}
              </div>
            </Box>
          ))}
      </div>
      {showCreateCategorie && (
        <CreateCategorie
          id={id}
          OnClose={() => setShowCreateCategorie(false)}
        />
      )}
    </Box>
  );
}
