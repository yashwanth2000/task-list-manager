import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filterStatus === "All" || task.status === filterStatus;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [tasks, filterStatus, searchQuery]); // Only re-run when tasks, filterStatus, or searchQuery change

  const contextValue = {
    tasks,
    filteredTasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
