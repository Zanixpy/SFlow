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
  const selectedProject = allProjects[id];

  const onDeleteCategorie = async (item) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    removeCategorie(selectedProject, item);
  };

  const [showCreateCategorie, setShowCreateCategorie] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showTasksList, setShowTasksList] = useState(false);

  const [activeStatusIndex, setActiveStatusIndex] = useState(null);

  return (
    <Box w={"340"} h={"150"} padding="p-0" margin="mt-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="mr-5 text-[25px] font-bold">Categories</h1>
        <AddBtn
          onClick={() => setShowCreateCategorie(true)}
          value={"+ New categorie"}
        />
      </div>
      {selectedProject.categories &&
        selectedProject.categories.map((item,index) => (
          <Box
            h={"40"}
            w={"300"}
            padding="px-4 py-3"
            margin="mb-5"
            className="border border-gray-200 shadow-xs rounded-lg"
            key={item.id}
          >
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <p className="text-[18px] font-semibold">{item.name}</p>
                <DeleteBtnV2
                  onClick={() => onDeleteCategorie(item)}
                  value={"Delete"}
                />
              </div>
              <div className="mb-2">
                <p className="text-gray-500 text-[14px]">
                  {Math.floor(
                    (item.totalBudget / selectedProject.totalBudget) * 100
                  )}
                  % of global budget
                </p>
              </div>
              <div className="flex items-center justify-between text-[15px]">
                <p>
                  {item.spentBudget} € / {item.totalBudget} €{" "}
                </p>
                <p className="text-gray-500">
                  {Math.floor((item.spentBudget / item.totalBudget) * 100)} %
                </p>
              </div>
              <div className="w-auto bg-[#68D391] border border-gray-200 py-1 rounded-lg mb-2"></div>
              <div className="flex items-center text-[14px] ">
                <p
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveStatusIndex(activeStatusIndex === index ? null : index)
                    setShowTasksList((val) => !val);
                  }}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg px-2 py-1 cursor-pointer mr-4"
                >
                  Display
                </p>
                <p
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveStatusIndex(activeStatusIndex === index ? null : index)
                    setShowCreateTask((val) => !val)
                }}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg px-2 py-1 cursor-pointer"
                >
                  Create Task +
                </p>
              </div>
            </div>
            {showCreateTask && (
              <CreateTask
                id={id}
                OnClose={() => setShowCreateTask(false)}
                categorie={item}
              />
            )}
            { showTasksList && item.tasks && (
              <TasksList id={id} categorie={item} />
            )}
          </Box>
        ))}
      {showCreateCategorie && (
        <CreateCategorie
          id={id}
          OnClose={() => setShowCreateCategorie(false)}
        />
      )}
    </Box>
  );
}
