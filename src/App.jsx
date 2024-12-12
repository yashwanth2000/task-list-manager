import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { TaskProvider, useTaskContext } from "./context/TaskContext";
import TaskTable from "./components/TaskTable";
import TaskStats from "./components/TaskStats";
import { fetchData } from "./utils/api";
import { Kanban, Plus } from "lucide-react";

function TaskManager() {
  const { setTasks } = useTaskContext();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const mappedTasks = await fetchData();
        setTasks(mappedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, [setTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Kanban className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              Task Management System
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="
                flex items-center space-x-2 
                bg-blue-600 text-white 
                px-4 py-2 rounded-lg 
                hover:bg-blue-700 
                transition duration-300 
                shadow-md hover:shadow-lg
                group
              "
            >
              <Plus className="group-hover:rotate-90 transition duration-300 w-5 h-5" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <TaskStats />
        <TaskTable />
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  );
}

export default App;
