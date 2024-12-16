import Task from "./task";

export default class Project {
    constructor(name, tasks) {
        this.name = name;
        this.tasks = [];
    }

    CreateTask(name, date, priority, check, description){
        let task = new Task(name, date, priority, check, description);

        this.tasks.push(task);
    }
}