// <!DOCTYPE html>

// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="stylesheet" href="style.css" />
//     <title>Todo App</title>
//     <link
//       rel="stylesheet"
//       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
//       integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
//       crossorigin="anonymous"
//       referrerpolicy="no-referrer"
//     />
//   </head>
//   <body>
//     <!-- navbar -->
//     <nav id="nav">
//       <section class="left">
//         <ul class="navUl">
//           <li id="check"><i class="fa-solid fa-circle-check"></i></li>
//           <li id="Alllists"></li>
//           <li id="caret"><i class="fa-solid fa-caret-down"></i></li>
//           <ul class="lists" style="display: none">
//             <li id="all">All</li>
//             <li id="personal">Personal</li>
//             <li id="work">Work</li>
//             <li id="shopping">Shopping</li>
//             <li id="study">Study</li>
//             <li id="others">Others</li>
//           </ul>
//         </ul>
//       </section>

//       <!-- notification -->
//       <section class="right">

//         <ul><li><i class="fa-solid fa-bell"></i></li></ul>
//         <!-- <ul>
//           <li id="search"><i class="fa-solid fa-magnifying-glass"></i></li>
//           <li id="more"><i class="fa-solid fa-ellipsis-vertical"></i></li>
//         </ul> -->
//       </section>
//     </nav>

//     <!-- to add todos -->
//     <div id="container">
//       <!-- <div class="tododiv">
//         <input type="checkbox" name="todo" id="todo" />
//         <div id="showTimeTitle">
//           <p id="todotitle">reading</p>
//           <p id="todoTime">2024-10-12</p>
//         </div>
//         <p id="priority">medium</p>
//         <p id="category">Work</p>
//         <i class="fa-regular fa-eye"></i>
//         <i class="fa-regular fa-pen-to-square"></i>
//         <i class="fa-solid fa-trash-can"></i>
//       </div> -->
//       <!-- ----------------------------------------------- -->

//       <i id="add" class="fa-solid fa-plus"></i>
//       <!-- ----------------------------------------------- -->
//       <div class="stickytodo" style="display: none">
//         <input type="text" id="taskTitle" placeholder="Enter Task Title" />
//         <textarea
//           placeholder="Enter Task Description"
//           id="taskDescription"
//         ></textarea>
//         <input type="time" id="taskDeadline" />
//         <!-- <input type="time"> -->
//         <select name="taskpriority" id="taskpriority">
//           <option>Select task priority</option>
//           <option style="color: green;" value="low">Low</option>
//           <option value="medium" style="color: orange;">Medium</option>
//           <option value="high" style="color: red;">High</option>
//         </select>
//         <select name="taskcategory" id="taskcategory">
//           <option>Select Category</option>
//           <option value="Personal">Personal</option>
//           <option value="Work">Work</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Wishlist">Study</option>
//           <option value="Others">Others</option>
//         </select>

//         <div id="buttons">
//           <button id="cancel">Cancel</button>
//           <button id="save">Save Task</button>
//         </div>
//       </div>
//     </div>

//     <!-- footer -->
//     <footer id="footer">
//       <i class="fa-solid fa-microphone"></i>
//       <input id="newTodo" type="text" placeholder="Enter Quick Task Here" />
//     </footer>

//     <script type="module" src="script.js"></script>
//   </body>
// </html>

// // intialising all DOM elements

const allLists = document.getElementById("Alllists");
const caret = document.getElementById("caret");

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
const lists = document.querySelector(".lists");
const listitems = document.querySelectorAll(".lists li");

const todocontainer = document.getElementById("container");



allLists.innerText = "All Lists";

function addNewTodoOnClick() {
  if (stickyTodo.style.display === "none") {
    stickyTodo.style.display = "flex";
  } else {
    stickyTodo.style.display = "none";
  }
}

addBtn.addEventListener("click", addNewTodoOnClick);

// --------------------------------------------------------




function cancelOnClick() {
  stickyTodo.style.display = "none";
}

cancelBtn.addEventListener("click", cancelOnClick);




// --------------------------------------------------------
function saveOnClick() {
  //   console.log(stickyTodo.children[0].value);

  localStorage.setItem(
    stickyTodo.children[0].value,
    JSON.stringify({
      title: stickyTodo.children[0].value,
      description: stickyTodo.children[1].value,
      deadline: stickyTodo.children[2].value,
      priority: stickyTodo.children[3].value,
      category: stickyTodo.children[4].value,
      checked: false,
    })
  );
  stickyTodo.style.display = "none";
}

saveBtn.addEventListener("click", saveOnClick);





// -----------------------------------------

function displayTodos() {
  if (localStorage.length > 0) {
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("tododiv");
      todoDiv.innerHTML = `
            <input type="checkbox" name="todo" id= todo${i} />
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
}

displayTodos();

// --------------------------------------------------------




// show todo if click on eye

const viewTodos = document.querySelectorAll(".fa-eye");

viewTodos.forEach((viewTodo) => {
  viewTodo.addEventListener("click", () => {
    console.log(viewTodo.parentNode);
    const clickedTodo = viewTodo.parentNode.children;
    // console.log(
    //   JSON.parse(
    //     localStorage.getItem(`${clickedTodo[1].children[0].innerText}`)
    //   )
    // );

    const todoObj = JSON.parse(
      localStorage.getItem(`${clickedTodo[1].children[0].innerText}`)
    );

    const stickytodo = document.querySelector(".stickytodo");
    stickytodo.style.display = "flex";

    stickytodo.children[0].value = todoObj.title;
    stickytodo.children[1].value = todoObj.description;
    stickytodo.children[2].value = todoObj.deadline;
    stickytodo.children[3].value = todoObj.priority;
    stickytodo.children[4].value = todoObj.category;
  });
});





// -----------------edit todo------------------------------

const editTodos = document.querySelectorAll(".fa-pen-to-square");

function editTodoFunc(selectedTodo) {
  console.log(selectedTodo.parentNode);

  const clickedTodo = selectedTodo.parentNode.children;
  const todoObj = JSON.parse(
    localStorage.getItem(`${clickedTodo[1].children[0].innerText}`)
  );

  saveBtn.onclick


  
  console.log(stickyTodo.children[0].value);

  if (
    stickyTodo.children[0].value == todoObj.title ||
    stickyTodo.children[1].value == todoObj.description ||
    stickyTodo.children[2].value == todoObj.deadline ||
    stickyTodo.children[3].value == todoObj.priority ||
    stickyTodo.children[4].value == todoObj.category
  ) {
    localStorage.setItem(
      stickyTodo.children[0].value,
      JSON.stringify({
        title: stickyTodo.children[0].value,
        description: stickyTodo.children[1].value,
        deadline: stickyTodo.children[2].value,
        priority: stickyTodo.children[3].value,
        category: stickyTodo.children[4].value,
        checked: false,
      })
    );

    localStorage.removeItem(
      `${selectedTodo.parentNode.children[1].children[0].innerText}`
    );

    // selectedTodo.parentNode.remove();
  }
}

editTodos.forEach((editTodo) => {
  editTodo.addEventListener("click", () => {
    editTodoFunc(editTodo);
  });
});

// ---------del todo-------------

// const delTodos = document.querySelectorAll(".fa-trash-can");

// function delTodoFunc(selectedTodo) {
//   const clickedTodo = selectedTodo.parentNode.children;
//   console.log(clickedTodo[1].children[0].innerText);

//   localStorage.removeItem(`${clickedTodo[1].children[0].innerText}`);
//   // selectedTodo.parentNode.remove();
// }

// delTodos.forEach((delTodo) => {
//   delTodo.addEventListener("click", () => {
//     delTodoFunc(delTodo);
//   });
// });
