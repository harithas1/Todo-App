document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("add");
  const stickyTodo = document.querySelector(".stickytodo");
  const cancelBtn = document.getElementById("cancel");
  const saveBtn = document.getElementById("save");
  const taskTitle = document.getElementById("taskTitle");
  const taskDescription = document.getElementById("taskDescription");
  const taskDeadline = document.getElementById("taskDeadline");
  const taskPriority = document.getElementById("taskpriority");
  const taskCategory = document.getElementById("taskcategory");
  const taskContainer = document.getElementById("container");
  const categoryList = document.querySelector(".lists");
  const viewSection = document.createElement("div"); // Section to view task details
  const allLists = document.getElementById("Alllists");
  const lists = document.querySelector(".lists");
  const listitems = document.querySelectorAll(".lists li");
  const caret = document.getElementById("caret");


  function sort(selectedCategory) {
    let keys = Object.keys(localStorage);

    if (selectedCategory === "All") {
        console.log(keys);

        keys.forEach((key) => {
          const todoDiv = document.createElement("div");
          todoDiv.classList.add("tododiv");
          if (JSON.parse(localStorage.getItem(key)).scratch) {
            todoDiv.classList.add("checked");
          } else {
            todoDiv.classList.remove("checked");
          }
          todoDiv.innerHTML = `
          <input type="checkbox" name="todo" id= todo${key} />
          <div id="showTimeTitle">
            <p id="todotitle">${key}</p>
            <p id="todoTime">${
              JSON.parse(localStorage.getItem(key)).deadline
            }</p>
          </div>
          <p id="priority">${
            JSON.parse(localStorage.getItem(key)).priority
          }</p>
          <p id="category">${
            JSON.parse(localStorage.getItem(key)).category
          }</p>
          <i class="fa-solid fa-eye" id="view"></i>
          <i class="fa-solid fa-pen-to-square" id="edit"></i>
          <i class="fa-solid fa-trash-can" id="delete"></i>
          `;
          taskContainer.appendChild(todoDiv);
        });
        
  }

  }


  allLists.innerText = "All Lists";

  caret.addEventListener("click", () => {
    lists.style.display = "block";

    listitems.forEach((listitem) => {
      listitem.addEventListener("click", () => {
        const selectedCategory = listitem.innerText;
        allLists.innerText = listitem.innerText;
        lists.style.display = "none";
        sort(selectedCategory);
      });

    });

  });

  viewSection.classList.add("viewSection");
  taskContainer.appendChild(viewSection);

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Show the form to add a new task
  addBtn.addEventListener("click", function () {
    stickyTodo.style.display = "block";
  });

  // Hide the form on cancel
  cancelBtn.addEventListener("click", function () {
    resetForm();
    stickyTodo.style.display = "none";
  });

  // Save a task
  saveBtn.addEventListener("click", function () {
    if (validateForm()) {
      const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        deadline: taskDeadline.value,
        priority: taskPriority.value,
        category: taskCategory.value,
      };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      resetForm();
      stickyTodo.style.display = "none";
    } else {
      alert("Please fill in all fields");
    }
  });

  // Render tasks from localStorage
  function renderTasks(filteredTasks = tasks) {
    const taskElements = document.querySelectorAll(".tododiv");
    taskElements.forEach((taskElement) => taskElement.remove());

    filteredTasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("tododiv");

      taskElement.innerHTML = `
        <input type="checkbox" class="taskCheckbox" data-index="${index}">
        <div id="showTimeTitle">
          <p id="todotitle">${task.title}</p>
          <p id="todoTime">${task.deadline}</p>
        </div>
        <p id="priority">${task.priority}</p>
        <p id="category">${task.category}</p>
        <i class="fa-regular fa-eye" data-index="${index}"></i>
        <i class="fa-regular fa-pen-to-square" data-index="${index}"></i>
        <i class="fa-solid fa-trash-can" data-index="${index}"></i>
      `;

      taskContainer.appendChild(taskElement);
    });
  }

  // Delete task
  taskContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-trash-can")) {
      const index = e.target.getAttribute("data-index");
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  });

  // Edit task
  taskContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-pen-to-square")) {
      const index = e.target.getAttribute("data-index");
      const task = tasks[index];
      taskTitle.value = task.title;
      taskDescription.value = task.description;
      taskDeadline.value = task.deadline;
      taskPriority.value = task.priority;
      taskCategory.value = task.category;

      stickyTodo.style.display = "block";
      saveBtn.onclick = function () {
        tasks[index] = {
          title: taskTitle.value,
          description: taskDescription.value,
          deadline: taskDeadline.value,
          priority: taskPriority.value,
          category: taskCategory.value,
        };
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        resetForm();
        stickyTodo.style.display = "none";
      };
    }
  });

  // View task details without alert
  taskContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-eye")) {
      const index = e.target.getAttribute("data-index");
      const task = tasks[index];
      viewSection.innerHTML = `
        <h3>Task Details</h3>
        <p><strong>Title:</strong> ${task.title}</p>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Category:</strong> ${task.category}</p>
      `;
    }
  });

  // Filter tasks by category
  categoryList.addEventListener("click", function (e) {
    const selectedCategory = e.target.id;
    if (selectedCategory) {
      const filteredTasks = tasks.filter(
        (task) => task.category === selectedCategory
      );
      renderTasks(filteredTasks);
    }
  });

  // Reset form fields
  function resetForm() {
    taskTitle.value = "";
    taskDescription.value = "";
    taskDeadline.value = "";
    taskPriority.value = "Select task priority";
    taskCategory.value = "Select Category";
  }

  // Validate form fields
  function validateForm() {
    return (
      taskTitle.value !== "" &&
      taskDescription.value !== "" &&
      taskDeadline.value !== "" &&
      taskPriority.value !== "Select task priority" &&
      taskCategory.value !== "Select Category"
    );
  }

  // Initial render of tasks on page load
  renderTasks();


});
