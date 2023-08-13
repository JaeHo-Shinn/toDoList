//할일 입력
// 버튼클릭 시 task에 할일 추가
//체크버튼 클릭 시 밑줄 추가, 버튼 변경
//delete버튼 클릭시 삭제
//탭 주제별로 분류
//전체탭-> 전체 아이템
// 끝남 탭 -> 끝난 아이템
// 진행중 탭 -> 끝나지 않은 아이템

let todoArray = [];
let filteredArray = [];
let tabState = "all";

const taskBoard = document.querySelector(".task-board");
const inputTodo = document.querySelector(".input-area__input");
const inputBtn = document.querySelector(".input-area__btn");

const tabs = document.querySelectorAll(".task-area__tabs div");
const underLine = document.querySelectorAll("#under-line");

function addToArray() {
  let newID = function () {
    return Math.random().toString(36).substr(2, 16);
  };

  let todo = inputTodo.value;

  todoArray.push({
    id: newID(),
    todo: todo,
    complete: false,
  });

  render();

  inputTodo.value = "";
}

function render() {
  let list = [];
  let listHTML = "";
  if (tabState == "all") {
    list = todoArray;
  } else {
    list = filteredArray;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].complete == true) {
      let makeHTML = `<div class="task-area__task">
      <div class="tasks checked">${list[i].todo}</div>
      <div class="task-area__task__btn">
        <button onclick="checkBtn('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
        <button onclick="delBtn('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;

      listHTML += makeHTML;
    } else {
      let makeHTML = `<div class="task-area__task">
    <div class="tasks">${list[i].todo}</div>
    <div class="task-area__task__btn">
      <button onclick="checkBtn('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onclick="delBtn('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`;

      listHTML += makeHTML;
    }
  }

  taskBoard.innerHTML = listHTML;
}

inputBtn.addEventListener("click", addToArray);

function checkBtn(a) {
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].id == a) {
      todoArray[i].complete = !todoArray[i].complete;
    }
  }

  filter();
}

function delBtn(a) {
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].id == a) {
      todoArray.splice(i, 1);
    }
  }

  filter();
}

function filter(e) {
  if (e) {
    tabState = e.target.className;
    if (tabState == "all") {
      e.target.parentNode.parentElement.children[0].style.left = 0 + "%";
    } else if (tabState == "goingon") {
      e.target.parentNode.parentElement.children[0].style.left = 33.33 + "%";
    } else if (tabState == "done") {
      e.target.parentNode.parentElement.children[0].style.left = 66.66 + "%";
    }
  }
  //eventlistener에서 작동한경우 event 값을 매개변수로 준다 => tabState값 변경
  //filter()로 작동한 경우 event 값은 undifined 이므로 tabState값 유지
  // ==>> check버튼 del 버튼으로 작동되는 경우 tabState을 유지한채 변경 가능

  let filteredList = [];
  if (tabState == "all") {
    render();
  }
  if (tabState == "goingon") {
    for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i].complete == false) {
        filteredList.push(todoArray[i]);
      }
    }
  }
  if (tabState == "done") {
    for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i].complete == true) {
        filteredList.push(todoArray[i]);
      }
    }
  }
  filteredArray = filteredList;

  render();
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", filter);
}
