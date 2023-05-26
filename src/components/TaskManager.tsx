import styles from "./TaskManager.module.css";
import {PlusCircle} from "phosphor-react";
import {TasksList} from "./TasksList.tsx";
import {ChangeEvent, FormEvent, InvalidEvent, useState} from "react";

interface Task {
    id: number;
    description: string;
    isCompleted: boolean;
}

export function TaskManager() {

    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const [actualId, setActualId] = useState(0);

    function handleCreateNewTask(event: FormEvent) {
        // typescript nao entende esse event se n for declarado no metodo.
        event.preventDefault();

        setActualId(actualId + 1);

        const newTask = {
            description: newTaskDescription,
            isCompleted: false,
            id: actualId
        }


        // Spread operator le os valores e copia.
        setTasks([...tasks, newTask]);
        setNewTaskDescription('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTaskDescription(event.target.value);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity('Esse campo é obrigatório.');
    }

    function deleteTask(id: number) {
        console.log(`deletar tarefa ${id}`);
        const tasksWithoutDeletedOne = tasks.filter((task) => {
            return task.id !== id;
        });
        setTasks(tasksWithoutDeletedOne);
    }

    function checkTask(id: number, isChecked: boolean) {
        console.log('teste', isChecked);

        const tasksUpdated = tasks.map((task) => {
            return task.id == id ? { ...task, isCompleted: isChecked } : task;
        })

        setTasks(tasksUpdated);
    }

    function handleIsChecked() {
        setIsChecked(!isChecked);
    }

    return(
        <>
            <form onSubmit={handleCreateNewTask} className={styles.taskManager}>
                <input
                    className={styles.input}
                    name="task"
                    placeholder="Adicione uma nova tarefa"
                    required
                    value={newTaskDescription}
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                />
                <button type={"submit"}
                        className={styles.btnCriar}> Criar
                    <PlusCircle style={{width: '16px', height: '16px'}}/>
                </button>
            </form>
            <div className={styles.taskslist}>
                <TasksList
                     tasks={tasks}
                     onDeleteTask={deleteTask}
                     onCheckTask={checkTask}
                />
            </div>
        </>
    )
}
