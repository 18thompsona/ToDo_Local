import checkBoldSvg from './asset/check-bold.svg'
import "./style.css";

import Project from './project';

const projects = document.querySelector(".projects");
const list = document.querySelector(".list");
const dialog = document.querySelector("#add-task-dialog");

const addTask = document.querySelector(".add-task");
addTask.addEventListener('click', () => {
    dialog.showModal();
});

dialog.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#form-title").value;
    const description = document.querySelector("#form-description").value;
    const date = document.querySelector("#form-date").value;
    const priority = document.querySelector("#priority-select").value;

    currentProject.CreateTask(title, date, priority, false, description);
    loadProject(currentProject);


    dialog.close();
});

const defaultProject = new Project("Default");
const currentProject = defaultProject;

projects.innerHTML = `<button>Default Project</button>`;

// list.innerHTML =   `<div class="task">
//                         <h2 class="title">Title</h2>
//                         <time class="time" datetime="2013-12-25 11:12" class="dueDate">2013-12-25 11:12</time>
//                         <span class="priority">Low</span>
//                         <input type="checkbox" id="complete" name="complete" value="complete">
//                         <span class="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa deleniti fugit animi ut nam vel nobis, ex vero labore asperiores explicabo pariatur laudantium architecto maxime. Deserunt perspiciatis eum sit ab.</span>
//                     </div>`


function createCard(name, date, priority, check, description){
    const task = document.createElement("div");
    task.classList.add("task");

    const header = document.createElement("div");
    header.classList.add("top-task")

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox")
    checkbox.type = "checkbox";
    checkbox.id = "complete";
    header.appendChild(checkbox);

    const title = document.createElement("h2");
    title.classList.add("title")
    title.textContent = name;
    header.appendChild(title);

    const time = document.createElement("time");
    time.classList.add("time");
    time.setAttribute("datetime", date);
    time.textContent = date;
    header.appendChild(time);

    const priorityElem = document.createElement("span");
    priorityElem.classList.add("priority");
    priorityElem.textContent = priority;
    header.appendChild(priorityElem);

    task.appendChild(header);


    const descriptionElem = document.createElement("span");
    descriptionElem.classList.add("description");
    descriptionElem.textContent = description;
    task.appendChild(descriptionElem);

    list.appendChild(task);
}

// console.log(defaultProject.tasks)
// createCard(defaultProject.tasks[0].name, defaultProject.tasks[0].date, defaultProject.tasks[0].priority, defaultProject.tasks[0].check, defaultProject.tasks[0].description);

function loadProject(project)
{
    list.innerHTML = "";
    for (let i = 0; i < project.tasks.length; i++) {
        createCard(defaultProject.tasks[i].name, defaultProject.tasks[i].date, defaultProject.tasks[i].priority, defaultProject.tasks[i].check, defaultProject.tasks[i].description);
    }
}


let lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa deleniti fugit animi ut nam vel nobis, ex vero labore asperiores explicabo pariatur laudantium architecto maxime. Deserunt perspiciatis eum sit ab.";

defaultProject.CreateTask("Title", "2024-12-22 08:00", "Low", "", lorem);
defaultProject.CreateTask("Title", "2024-12-22 08:00", "Low", "", lorem);

loadProject(defaultProject);