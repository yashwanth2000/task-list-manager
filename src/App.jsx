import { Toaster } from "react-hot-toast";
import { TaskStats } from "./components/TaskStats";
import { TaskTable } from "./components/TaskTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left w-full sm:w-auto">
            Task Management System
          </h1>
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

export default App;
