import './App.module.css';
import './global.css';
import {Header} from "./components/Header.tsx";
import {TaskManager} from "./components/TaskManager.tsx";
import styles from "./App.module.css";

export function App() {

  return (
    <>
      <Header/>
        <div className={styles.wrapper}>
            <TaskManager/>
        </div>
    </>
  )
}

export default App
