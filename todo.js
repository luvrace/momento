const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];



function updateToDo(event){
    const btn = event.target;
    const li = btn.parentNode;

    if(btn.innerText==="수정"){
        btn.innerText="확인";
        const span = li.querySelector("span");
        const spanText = span.innerText;
        const newToDo = document.createElement("input");
        newToDo.value= spanText;
        span.before(newToDo);
        li.removeChild(span); 
        //li.appendChild(newToDo);
    } else {
        btn.innerText = "수정";
        const input = li.querySelector("input");
        const inputText = input.value;
        const spanText = document.createElement("span")
        spanText.innerText = inputText;
        input.before(spanText);
        li.removeChild(input);
        //li.appendChild(spanText);
        for (let i= 0; i< toDos.length; i++) {
            if(toDos[i].id==li.id){
                toDos[i].text = inputText;
            }
        }
        saveToDos();
    }
}


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //filter 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.
    const cleanToDos = toDos.filter((toDo)=>{
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();
    
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "수정";
    updateBtn.addEventListener("click", updateToDo);
    const span = document.createElement("span");
    const newId = toDos.length +1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(updateBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id:newId,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value ="";
}

function loadToDos(){
    loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(toDo => {
            paintToDo(toDo.text);
        });
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();