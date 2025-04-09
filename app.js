document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedTasks.length > 0) {
        tasks = storedTasks;
        updateTasksList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    // Store the index of the task being edited
    taskInput.setAttribute("data-edit-index", index);
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();

    const taskInput = document.getElementById("taskInput");
    const editIndex = taskInput.getAttribute("data-edit-index");

    if (editIndex !== null) {
        // Editing an existing task
        tasks[editIndex].text = taskInput.value;
        taskInput.removeAttribute("data-edit-index");
    } else {
        // Adding a new task
        addTask();
    }

    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTasks();
});

   
  
const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if ( tasks.length && completedTasks === totalTasks) {
        blaskConfetti();
     }
};

 


// const updateTasksList = () => {
//     const taskList = document.getElementById("task-list");
//     taskList.innerHTML = "";

//     tasks.forEach((task, index) => {
//         const listItem = document.createElement("li");

//         listItem.innerHTML = `
//             <div class="taskItem">
//                 <div class="task ${task.completed ? "completed" : ""}">
//                     <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onChange="toggleTaskComplete(${index})"/>
//                     <p>${task.text}</p>
//                 </div>
//                 <div class="icons">
//                     <img src="./images/edit.png" onClick="editTask(${index})"/>
//                     <img src="./images/bin.png" onClick="deleteTask(${index})"/>
//                 </div>
//             </div>
//         `;

//         taskList.append(listItem);
//     });
// };

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        const taskItem = document.createElement("div");
        taskItem.className = "taskItem";

        const taskDiv = document.createElement("div");
        taskDiv.className = `task ${task.completed ? "completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", () => toggleTaskComplete(index));

        const taskText = document.createElement("p");
        taskText.textContent = task.text;

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);

        const iconsDiv = document.createElement("div");
        iconsDiv.className = "icons";

        const editImg = document.createElement("img");
        editImg.src = "./images/edit.png";
        editImg.alt = "Edit";
        editImg.addEventListener("click", () => editTask(index));

        const binImg = document.createElement("img");
        binImg.src = "./images/bin.png";
        binImg.alt = "Delete";
        binImg.addEventListener("click", () => deleteTask(index));

        iconsDiv.appendChild(editImg);
        iconsDiv.appendChild(binImg);

        taskItem.appendChild(taskDiv);
        taskItem.appendChild(iconsDiv);
        listItem.appendChild(taskItem);

        taskList.appendChild(listItem);
    });
};



const blaskConfetti = () =>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
