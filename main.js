const allLists = document.getElementById("Alllists");
allLists.innerText = "All Lists";

// ------------------caret symbol rotate----------------

const caret = document.getElementById("caret");

const footer = document.getElementById("footer");
const newTodoInput = document.getElementById("newTodo");

const newTodo = document.getElementById("newTodo");

console.log(newTodo.value);

// -----------tick symbol typing--------------

newTodo.addEventListener("click", () => {
  if (!footer.querySelector(".fa-check")) {
    const tick = document.createElement("i");
    tick.classList.add("fa-solid");
    tick.classList.add("fa-check");
    footer.appendChild(tick);
  }
});
footer.addEventListener("mouseleave", () => {
  const tick = document.querySelector(".fa-check");
  if (!newTodo.value && tick) {
    tick.remove();
  }
});

// ---------------------clicking on plus symbol---------------------------------------------------------

const ADDNEWTODOPLUS = document.getElementById("add");
const CANCEL = document.getElementById("cancel");
const SAVETODO = document.getElementById("save");
const TASKTITLE = document.getElementById("taskTitle");
const TASKDESCRIPTION = document.getElementById("taskDescription");
const TASKDEADLINE = document.getElementById("taskDeadline");
const TASKPRIORITY = document.getElementById("taskpriority");
const stickytodo = document.querySelector(".stickytodo");

const TASKCATEGORY = document.getElementById("taskcategory");
const categoryOptions = document.querySelectorAll("#category option");

const todocontainer = document.getElementById("container");
const trash = document.querySelectorAll(".fa-trash-can");





ADDNEWTODOPLUS.addEventListener("click", () => {
  TASKTITLE.value = "";
  TASKDESCRIPTION.value = "";
  TASKDEADLINE.value = "";
  // TASKCATEGORY.value = "";
  // TASKPRIORITY.value = "";

  // const stickytodo = document.querySelector(".stickytodo");
  if (stickytodo.style.display === "none") {
    stickytodo.style.display = "flex";
  } else {
    stickytodo.style.display = "none";
  }

  CANCEL.addEventListener("click", () => {
    stickytodo.style.display = "none";
  });

  SAVETODO.addEventListener("click", () => {
    if (!TASKTITLE.value || TASKCATEGORY == "") {
      alert("Enter Task Title");
    } else if (!TASKDESCRIPTION.value || TASKDESCRIPTION == "") {
      alert("Enter Task Description");
    } else if (!TASKDEADLINE.value) {
      alert("Enter Task Deadline");
    } else if (!TASKPRIORITY.value) {
      alert("Enter Task Priority");
    } else if (!TASKCATEGORY.value) {
      alert("Enter Task Category");
    } else {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("tododiv");
      todoDiv.innerHTML = `
        <input type="checkbox" name="todo" id="todo" />
        <div id="showTimeTitle">
          <p id="todotitle">${
            TASKTITLE.value.length > 15
              ? TASKTITLE.value.slice(0, 15) + "..."
              : TASKTITLE.value
          }</p>
          <p id="todoTime">${TASKDEADLINE.value}</p>
        </div>
        <p id="priority">${TASKPRIORITY.value}</p>
        <p id="category">${TASKCATEGORY.value}</p>
        <i class="fa-regular fa-eye"></i>
        <i class="fa-regular fa-pen-to-square"></i>
        <i class="fa-solid fa-trash-can"></i>
      `;

      todocontainer.appendChild(todoDiv);

      // -------local storage- setting item----------
      localStorage.setItem(
        TASKTITLE.value,
        JSON.stringify({
          title: TASKTITLE.value,
          description: TASKDESCRIPTION.value,
          deadline: TASKDEADLINE.value,
          priority: TASKPRIORITY.value,
          category: TASKCATEGORY.value,
        })
      );

      // const trash = todoDiv.querySelector(".fa-trash-can");
      // trash.addEventListener("click", () => {
      //   // todoDiv.remove();
      // });

      stickytodo.style.display = "none";
    }
  });
});

// console.log(TASKPRIORITY.value);

// ------------local storage getting item-----------

let todoIdIndex = 0;
const keys = Object.keys(localStorage);

if (localStorage.length > 0) {
  // const keys = Object.keys(localStorage);
  console.log(keys);

  for (let i = 0; i < keys.length; i++) {
    todoIdIndex += 1;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("tododiv");
    if (JSON.parse(localStorage.getItem(keys[i])).scratch) {
      todoDiv.classList.add("checked");
    } else {
      todoDiv.classList.remove("checked");
    }

    // todoDiv.classList.add(localStorage.getItem(keys[i]).scratch ? "checked" : "");
    todoDiv.innerHTML = `
        <input type="checkbox" name="todo" id= todo${todoIdIndex} />
        <div id="showTimeTitle">
          <p id="todotitle">${keys[i]}</p>
          <p id="todoTime">${
            JSON.parse(localStorage.getItem(keys[i])).deadline
          }</p>
        </div>
        <p id="priority">${
          JSON.parse(localStorage.getItem(keys[i])).priority
        }</p>
        <p id="category">${
          JSON.parse(localStorage.getItem(keys[i])).category
        }</p>
        <i class="fa-regular fa-eye"></i>
        <i class="fa-regular fa-pen-to-square"></i>
        <i class="fa-solid fa-trash-can"></i>
      `;

    todocontainer.appendChild(todoDiv);
  }
}

// ---------------------------------------------------------

// ----------------delete todo----------------

const todos = document.querySelectorAll(".fa-trash-can");

todos.forEach((todo) => {
  todo.addEventListener("click", () => {
    console.log(todo.parentElement);
    const clickedTodo = todo.parentElement.children;
    localStorage.removeItem(`${clickedTodo[1].children[0].innerText}`);
    todo.parentElement.remove();
  });
});

// ------------------view todo/edit todo----------------

const viewTodos = document.querySelectorAll(".fa-eye");

viewTodos.forEach((viewTodo) => {
  viewTodo.addEventListener("click", () => {
    console.log(viewTodo.parentNode);
    const clickedTodo = viewTodo.parentNode.children;
    // console.log(clickedTodo);
    // console.log(clickedTodo[1]);
    // console.log(clickedTodo[1].children[0].innerText);
    console.log(
      JSON.parse(
        localStorage.getItem(`${clickedTodo[1].children[0].innerText}`)
      )
    );

    const todoObj = JSON.parse(
      localStorage.getItem(`${clickedTodo[1].children[0].innerText}`)
    );
    const ttile = todoObj.title;
    const tdescription = todoObj.description;
    const tdeadline = todoObj.deadline;
    const tpriority = todoObj.priority;
    const tcategory = todoObj.category;

    const stickytodo = document.querySelector(".stickytodo");
    stickytodo.style.display = "flex";

    stickytodo.children[0].value = ttile;
    stickytodo.children[1].value = tdescription;
    stickytodo.children[2].value = tdeadline;
    stickytodo.children[3].value = tpriority;
    stickytodo.children[4].value = tcategory;
  });
});

// -----------------edit todo ---------------------'

function EDITTODO(editTodo) {
  // const editTodos = document.querySelectorAll(".fa-pen-to-square");

  // editTodos.forEach((editTodo) => {
  // editTodo.addEventListener("click", () => {
  console.log(editTodo.parentNode);

  const clickedTodo = editTodo.parentNode.children;

  console.log(clickedTodo);

  console.log(clickedTodo[3].innerText);

  console.log(clickedTodo[1].children[0]);
  console.log(clickedTodo[1].children[0].innerText);
  console.log(clickedTodo[1].children[1]);
  console.log({ category: clickedTodo[1].children[4] });

  // console.log(clickedTodo[1].children[2]);
  // console.log(clickedTodo[1].children[3]);
  // console.log(clickedTodo[1].children[4]);

  // console.log(clickedTodo[1].children[0].innerText);

  const editingTodoKey = clickedTodo[1].children[0].innerText;
  console.log(typeof editingTodoKey);

  const todoObj = JSON.parse(localStorage.getItem(`${editingTodoKey}`));

  console.log(todoObj);

  if (todoObj) {
    const { title, description, deadline, priority, category } = todoObj;

    const stickytodo = document.querySelector(".stickytodo");
    stickytodo.style.display = "flex";

    stickytodo.children[0].value = title;
    stickytodo.children[1].value = description;
    stickytodo.children[2].value = deadline;
    stickytodo.children[3].value = priority;
    stickytodo.children[4].value = category;

    SAVETODO.onclick = () => {
      const updatedTitle = stickytodo.children[0].value;
      const updatedDescription = stickytodo.children[1].value;
      const updatedDeadline = stickytodo.children[2].value;
      const updatedPriority = stickytodo.children[3].value;
      const updatedCategory = stickytodo.children[4].value;

      if (
        title !== updatedTitle ||
        description !== updatedDescription ||
        deadline !== updatedDeadline ||
        priority !== updatedPriority ||
        category !== updatedCategory
      ) {
        localStorage.removeItem(editingTodoKey);
        localStorage.setItem(
          updatedTitle,
          JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
            deadline: updatedDeadline,
            priority: updatedPriority,
            category: updatedCategory,
          })
        );
        console.log(clickedTodo[1].children[0].innerText);

        clickedTodo[1].children[0].innerText = updatedTitle;
        // clickedTodo[1].children[1].innerText = updatedDescription;
        clickedTodo[1].children[1].innerText = updatedDeadline;
        clickedTodo[2].innerText = updatedPriority;
        clickedTodo[3].innerText = updatedCategory;
        stickytodo.style.display = "none";
        // editTodo();
      } else {
        stickytodo.style.display = "none";
      }
    };
  }
  // });
  // });
}

const editTodos = document.querySelectorAll(".fa-pen-to-square");

editTodos.forEach((editTodo) => {
  editTodo.addEventListener("click", () => {
    // console.log(editTodo);

    EDITTODO(editTodo);
  });
});

// editTodo();

// ----------------------------save todo-------------------------

CANCEL.addEventListener("click", () => {
  stickytodo.style.display = "none";
});

SAVETODO.addEventListener("click", () => {
  localStorage.setItem(
    stickytodo.children[0].value,
    JSON.stringify({
      title: stickytodo.children[0].value,
      description: stickytodo.children[1].value,
      deadline: stickytodo.children[2].value,
      priority: stickytodo.children[3].value,
      category: stickytodo.children[4].value,
    })
  );
  stickytodo.style.display = "none";
});

// ---------------------Checked -scratch todo/ save scratched to local storage-------------------------

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      checkbox.parentElement.style.textDecoration = "line-through";
      // console.log("checkbox");

      let todoObj = JSON.parse(
        localStorage.getItem(
          `${checkbox.parentElement.children[1].children[0].innerText}`
        )
      );

      todoObj.scratch = true;
      localStorage.setItem(
        `${checkbox.parentElement.children[1].children[0].innerText}`,
        JSON.stringify(todoObj)
      );
    } else {
      checkbox.parentElement.style.textDecoration = "none";

      let todoObj = JSON.parse(
        localStorage.getItem(
          `${checkbox.parentElement.children[1].children[0].innerText}`
        )
      );

      todoObj.scratch = false;
      localStorage.setItem(
        `${checkbox.parentElement.children[1].children[0].innerText}`,
        JSON.stringify(todoObj)
      );
    }
  });

  // location.reload();
});

// ---------sort todos based on category----------

caret.addEventListener("click", () => {
  const lists = document.querySelector(".lists");

  if (lists.style.display === "none") {
    lists.style.display = "flex";
  } else {
    lists.style.display = "none";
  }
});

const lists = document.querySelector(".lists");

const listitems = document.querySelectorAll(".lists li");

function sort(selectedCategory) {
  todocontainer.innerHTML = "";
  let keys = Object.keys(localStorage);
  if (selectedCategory === "All") {
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
      todocontainer.appendChild(todoDiv);
      
  
    });
  } else {
    keys.forEach((key) => {
      if (JSON.parse(localStorage.getItem(key)).category === selectedCategory) {
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
          <p id="priority">${JSON.parse(localStorage.getItem(key)).priority}</p>
          <p id="category">${JSON.parse(localStorage.getItem(key)).category}</p>
          <i class="fa-solid fa-eye" id="view"></i>
          <i class="fa-solid fa-pen-to-square" id="edit"></i>
          <i class="fa-solid fa-trash-can" id="delete"></i>
            `;
        todocontainer.appendChild(todoDiv);
      }
    });
  }
}

listitems.forEach((listitem) => {
  listitem.addEventListener("click", () => {
    const selectedCategory = listitem.innerText;
    sort(selectedCategory);
    lists.style.display = "none";
  });
});


