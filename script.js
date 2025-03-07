const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasksByDate = JSON.parse(localStorage.getItem("tasksByDate")) || {};

function addTask(){
    let inputValue = inputBox.value.trim();
    let dateInput = document.getElementById('myDateInput').value;
    if(inputValue === ''){
        // alert("You must write something");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You must write something!",
          });
        return;
    }if (!tasksByDate[dateInput]) {
        tasksByDate[dateInput] = []; 
    }else{
        // let li =document.createElement("li");
        // li.innerHTML = inputBox.value;
        // listContainer.appendChild(li);
        inputBox.value = '';  
        // let span = document.createElement("span");
        // span.innerHTML = '\u00d7';
        // li.appendChild(span);

        tasksByDate[dateInput].push(inputValue);
        displayData(document.getElementById('myDateInput').value);
    }
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
    localStorage.setItem("data",listContainer.innerHTML);
}
function loadData(){
    tasksByDate.innerHTML = localStorage.getItem("tasksByDate", JSON.stringify(tasksByDate))
    listContainer.innerHTML = localStorage.getItem("data");
    let selectedDate = document.getElementById('myDateInput').value;
}

function getDate(){
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-CA');
    document.getElementById('myDateInput').value = formattedDate;    
    return formattedDate;
}

function displayData(date){
    listContainer.innerHTML = '';
    tasksByDate[date].array.forEach(element => {
        let li =document.createElement("li");
        li.innerHTML = element
        listContainer.appendChild(li);
        // inputBox.value = '';  
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    });
}
document.getElementById("myDateInput").addEventListener("change",function(){
    let selectedDate = document.getElementById("myDateInput").value;
    displayData(selectedDate);
})

displayData(getDate);
getDate();
loadData();