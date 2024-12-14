import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { TaskProvider, useTaskContext } from "./context/TaskContext";
import TaskTable from "./components/TaskTable";
import TaskStats from "./components/TaskStats";
import { fetchData } from "./utils/api";
import { Kanban } from "lucide-react";
import TaskFilters from "./components/TaskFilters";
import AddTaskForm from "./components/AddTaskForm";
import toast from "react-hot-toast";

function TaskManager() {
  const { setTasks } = useTaskContext();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const mappedTasks = await fetchData();
        setTasks(mappedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
        toast.error("Failed to load tasks");
      }
    };

    loadTasks();
  }, [setTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between animate-fade-in-down">
          <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <Kanban className="w-10 h-10 text-gray-700 hover:text-blue-500 transition-colors duration-300" />
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight hover:text-blue-600 transition-colors duration-300">
              Task Management System
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="animate-fade-in-up">
          <TaskStats />
          <TaskFilters />
          <AddTaskForm />
          <TaskTable />
        </main>
      </div>

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
