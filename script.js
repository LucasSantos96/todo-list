const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddtask = () => {
  const inputIsvalid = validateInput();

  if (!inputIsvalid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;
  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-solid");
  deleteItem.classList.add("fa-trash-can");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updatelocalstorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent))
      task.firstChild.classList.toggle("completed");
  }
  updatelocalstorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      taskItemContainer.remove();
    }
  }
  updatelocalstorage();
};

const handleInputChange = () => {
  const inputIsvalid = validateInput();

  if (inputIsvalid) {
    return inputElement.classList.remove("error");
  }
};
const updatelocalstorage = () => {
  const tasks = tasksContainer.childNodes;
  const localstoragetasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });
  localStorage.setItem("tasks", JSON.stringify(localstoragetasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
  if (!tasksFromLocalStorage) return;
  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;
    if (task.isCompleted) {
      taskContent.classList.add("completes");
    }
    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddtask());

inputElement.addEventListener("change", () => handleInputChange());
