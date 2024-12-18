import checkBoldSvg from './asset/check-bold.svg'
import "./style.css";

import Project from './project';

const projectsElement = document.querySelector(".projects");
const list = document.querySelector(".list");
const dialog = document.querySelector("#add-task-dialog");
const projectdialog = document.querySelector("#add-project-dialog")

const addProject = document.querySelector(".add-project");

const Projects = [];
const defaultProject = new Project("Default");
let currentProject = defaultProject;
Projects.push(defaultProject);


addProject.addEventListener("click", (event) => {
    projectdialog.showModal();
});

projectdialog.addEventListener("submit", (event) => {
    event.preventDefault();

    const projectName = document.querySelector("#form-project-title").value;

    Projects.push(new Project(projectName));
    console.log(Projects);
    displayProjects();

    projectdialog.close();
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


function createCard(name, date, priority, check, description, index){
    const task = document.createElement("div");
    task.classList.add("task");

    const header = document.createElement("div");
    header.classList.add("top-task")

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox")
    checkbox.type = "checkbox";
    checkbox.id = "complete";
    checkbox.checked = check;
    header.appendChild(checkbox);

    checkbox.addEventListener("click", (event) => {
        currentProject.tasks[index].flipCheck();
        console.log(currentProject.tasks[index]);
    });

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

function loadProject(project)
{
    list.innerHTML = "";
    for (let i = 0; i < project.tasks.length; i++) {
        createCard(currentProject.tasks[i].name, currentProject.tasks[i].date, currentProject.tasks[i].priority, currentProject.tasks[i].check, currentProject.tasks[i].description, i);
    }
    const addTask = document.createElement("button");
    addTask.textContent = "Add Task";
    addTask.classList.add("add-task");
    addTask.addEventListener('click', () => {
        dialog.showModal();
    });
    
    list.append(addTask);
}

function displayProjects()
{
    projectsElement.innerHTML = "";
    for (let i = 0; i < Projects.length; i++) {
        const element = document.createElement("button");
        element.textContent = Projects[i].name;

        element.addEventListener("click", (event) => {
           switchProject(i);
           console.log("switching")
        })

        projectsElement.append(element)
    }
}

function switchProject(index){
    currentProject = Projects[index];
    loadProject(currentProject);
}


let lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa deleniti fugit animi ut nam vel nobis, ex vero labore asperiores explicabo pariatur laudantium architecto maxime. Deserunt perspiciatis eum sit ab.";

defaultProject.CreateTask("Title", "2024-12-22 08:00", "Low", false, lorem);
defaultProject.CreateTask("Title", "2024-12-22 08:00", "Low", true, lorem);

displayProjects();
loadProject(defaultProject);

//A quick test