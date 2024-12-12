import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { TaskProvider, useTaskContext } from "./context/TaskContext";
import TaskTable from "./components/TaskTable";
import TaskStats from "./components/TaskStats";
import { fetchData } from "./utils/api";
import { Kanban } from "lucide-react";
import TaskFilters from "./components/TaskFilters";
import AddTaskForm from "./components/AddTaskForm";

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
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <TaskStats />
        <TaskFilters />
        <AddTaskForm />
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
