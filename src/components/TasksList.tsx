import styles from './TasksList.module.css';
import {ClipboardText,  Trash} from "phosphor-react";
import {useState} from "react";

interface Task {
    id: number;
    description: string;
    isCompleted: boolean;
}

interface TasksListProps {
    tasks: Task[];
    onDeleteTask: (id: number) => void;
    onCheckTask: (id: number, isChecked: boolean) => void;
}
export function TasksList(tasks: TasksListProps) {

    const [isChecked, setIsChecked] = useState(false);

    function handleCheckTask (id: number) {
        setIsChecked(!isChecked);
        tasks.onCheckTask(id, isChecked);
    }

    function handleDeleteTask(id:number) {
        tasks.onDeleteTask(id);
    }

    return(
        <div className={styles.tasksBoard}>
            <div className={styles.tasksStatistics}>
                <div className={styles.taskstatus}>
                    <p className={styles.createdTasks}>Tarefas criadas</p>
                    <span className={styles.totalCreateCounter}>{tasks.tasks.length}</span>
                </div>
                <div className={styles.taskstatus}>
                    <p className={styles.concludedTasks}>Concluídas</p>
                    <span className={styles.totalCreateCounter}>{tasks.tasks.filter((task) => { return task.isCompleted}).length}
                    </span>
                </div>
            </div>

            <div className={styles.noTasks}>
                {tasks.tasks.length === 0 && (
                    <>
                        <ClipboardText size={45} className={styles.icon}></ClipboardText>
                        <p style={{fontWeight: '400'}}>Você ainda não tem tarefas cadastradas</p>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </>
                )}

                {tasks.tasks.map((task, index) => {
                    return <>
                        <div className={styles.task} key={task.id}>
                            <input
                                type={"checkbox"}
                                checked={task.isCompleted}
                                onChange={() => handleCheckTask(task.id)}
                            />
                            <p className={task.isCompleted ? styles.taskCompleted : styles.taskToDo}>{task.description}</p>
                            <button onClick={() => handleDeleteTask(task.id)}>
                                <Trash size={20}/>
                            </button>
                        </div>
                    </>
                })}
            </div>

        </div>
    )
}
