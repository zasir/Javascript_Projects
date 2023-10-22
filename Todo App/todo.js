const addbtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#task");
const count = document.querySelector("#count-value");
const error = document.querySelector("#error");

let taskCount = 0;
let chkArrLen = JSON.parse(localStorage.getItem("chkArrLen"));

let chkedLen;
let taskNameArr = [];
let chkArr = [];
const displayCount = (taskCount) => {
  count.innerText = taskCount;
};

let taskname;
let retArray = JSON.parse(localStorage.getItem("data"));
let retChkArr = JSON.parse(localStorage.getItem("chkArrData"));
let retChkLen;

const addTask = () => {
  taskname = newTaskInput.value.trim();
  addbtn.innerText = "Add";
  addbtn.style.backgroundColor = "#5a95ff";

  error.style.display = "none";
  if (!taskname) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }
  retArray = JSON.parse(localStorage.getItem("data"));
  if (retArray) {
    taskNameArr = retArray;
  }
  retChkArr = JSON.parse(localStorage.getItem("chkArrData"));
  if (retChkArr) {
    chkArr = retChkArr;
  }

  chkArr.push(false);
  saveChkData(chkArr.length, chkArr);

  taskInner(taskname);
  taskCount += 1;

  taskNameArr.push(taskname);

  saveData(taskCount, taskNameArr);
  retChkLen = localStorage.getItem("checkedLen");
  displayCount(taskCount - retChkLen);

  deleteB();
  edit();
  checkbox();

  newTaskInput.value = "";
};
addbtn.addEventListener("click", addTask);

function taskInner(taskname) {
  const task = `<div class="task" >
  <input type="checkbox" class="task-check">
  <span class="taskname" ">${taskname}</span>
  <button class="edit" >
  <i class="fa-solid fa-pen-to-square"></i>
  </button>
  <button class="delete">
  <i class="fa-sharp fa-solid fa-trash"></i>
  </button>
  </div>
  `;
  taskContainer.insertAdjacentHTML("beforeend", task);
}

function deleteB() {
  let id = 0;
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((btn) => {
    btn.setAttribute("id", id);

    id++;
    btn.onclick = () => {
      retChkArr = JSON.parse(localStorage.getItem("chkArrData"));

      retArray = JSON.parse(localStorage.getItem("data"));

      let btnId = btn.getAttribute("id");

      btn.parentNode.remove();

      retArray.splice(btnId, 1);

      taskCount--;

      if (retChkArr) {
        retChkArr.splice(btnId, 1);
        saveChkData(retChkArr.length, retChkArr);
        saveData(taskCount, retArray);
      }
      if (btn.parentNode.firstElementChild.checked) {
        retChkLen = localStorage.getItem("checkedLen");
        localStorage.setItem("checkedLen", retChkLen - 1);
      } else {
        retChkLen = localStorage.getItem("checkedLen");
        displayCount(taskCount - retChkLen);
      }

      deleteB();
      edit();
    };
  });
}

function edit() {
  retArray = JSON.parse(localStorage.getItem("data"));
  retChkArr = JSON.parse(localStorage.getItem("chkArrData"));

  let id = 0;

  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((btn) => {
    btn.setAttribute("id", id);
    id++;
    btn.onclick = (e) => {
      if (newTaskInput.value === "") {
        addbtn.innerText = "Edit";
        addbtn.style.backgroundColor = "red";

        let targetElement = e.target;
        if (!(targetElement.className == "edit")) {
          targetElement = e.target.parentElement;
        }
        newTaskInput.value = targetElement.previousElementSibling.innerText;
        targetElement.parentNode.remove();

        let btnId = btn.getAttribute("id");
        retArray.splice(btnId, 1);
        retChkArr.splice(btnId, 1);
        saveChkData(retChkArr.length, retChkArr);
        taskCount -= 1;

        saveData(taskCount, retArray);
        retChkLen = localStorage.getItem("checkedLen");

        displayCount(taskCount - retChkLen);
      }
      edit();
    };
  });
}

function checkbox() {
  let id = 0;
  retChkArr = JSON.parse(localStorage.getItem("chkArrData"));
  chkArrLen = JSON.parse(localStorage.getItem("chkArrLen"));
  retChkLen = localStorage.getItem("checkedLen");
  if (retChkLen) {
    chkedLen = retChkLen;
  } else {
    chkedLen = 0;
  }

  const taskCheck = document.querySelectorAll(".task-check");
  taskCheck.forEach((chkBox) => {
    chkBox.setAttribute("id", id);
    id++;
    chkBox.onchange = () => {
      checkbox();
      chkBox.nextElementSibling.classList.toggle("completed");
      let editbtn = chkBox.parentNode.childNodes[5];
      let chkBoxId = chkBox.getAttribute("id");
      if (chkBox.checked) {
        retChkArr[chkBoxId] = true;
        chkedLen++;
        editbtn.setAttribute("disabled", "");
        editbtn.style.backgroundColor = "#5a94ff6e";
        editbtn.style.cursor = "default";

        displayCount(chkArrLen - chkedLen);
        saveChkData(chkArrLen, retChkArr);
        localStorage.setItem("checkedLen", chkedLen);
      } else {
        retChkArr[chkBoxId] = false;

        chkedLen--;
        editbtn.removeAttribute("disabled");
        editbtn.style.cursor = "pointer";
        editbtn.style.backgroundColor = "#5a95ff";

        displayCount(chkArrLen - chkedLen);
        saveChkData(chkArrLen, retChkArr);
        localStorage.setItem("checkedLen", chkedLen);
      }
    };
  });
}

function saveData(taskCount, arr) {
  let string = JSON.stringify(arr);
  localStorage.setItem("data", string);
  localStorage.setItem("taskCount", taskCount);
}
function saveChkData(chkLen, chkarr) {
  let string = JSON.stringify(chkarr);
  localStorage.setItem("chkArrData", string);
  localStorage.setItem("chkArrLen", chkLen);
}
function showData() {
  retArray = JSON.parse(localStorage.getItem("data"));
  let retaskCount = JSON.parse(localStorage.getItem("taskCount"));
  if (retaskCount) {
    taskCount = retaskCount;
  } else {
    taskCount = 0;
  }

  displayCount(taskCount);

  for (let i = 0; i < retaskCount; i++) {
    taskInner(retArray[i]);
  }

  retChkArr = JSON.parse(localStorage.getItem("chkArrData"));
  chkArrLen = localStorage.getItem("chkArrLen");
  if (retChkArr) {
    const taskCheck = document.querySelectorAll(".task-check");
    let i = 0;
    taskCheck.forEach((chkbox) => {
      let editbtn = chkbox.parentNode.childNodes[5];
      chkbox.checked = retChkArr[i];
      if (chkbox.checked) {
        editbtn.setAttribute("disabled", "");
        editbtn.style.backgroundColor = "#5a94ff6e";
        editbtn.style.cursor = "default";
        chkbox.nextElementSibling.classList.toggle("completed");
        retChkLen = localStorage.getItem("checkedLen");
        displayCount(chkArrLen - retChkLen);
      } else {
        editbtn.removeAttribute("disabled");
        editbtn.style.cursor = "pointer";
        editbtn.style.backgroundColor = "#5a95ff";
      }
      i++;
    });
  }

  deleteB();
  edit();
  checkbox();
}

showData();
