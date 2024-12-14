import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";

const AddTaskForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [errors, setErrors] = useState({});

  const { addTask } = useTaskContext();

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addTask({
        title: title.trim(),
        description: description.trim() || "No description provided.",
        status,
      });

      toast.success("Task added successfully!", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });

      // Reset form
      setTitle("");
      setDescription("");
      setStatus("To Do");
      setIsOpen(false);
    } else {
      toast.error("Please fix form errors", {
        style: {
          background: "#ff4444",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="
            flex items-center gap-2 
          bg-gray-800 text-white 
            px-4 py-2 rounded-lg 
          hover:bg-gray-700 
            transition-colors 
            group"
        >
          <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          Add New Task
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="
            bg-white p-6 rounded-lg 
            shadow-md border border-gray-200
          "
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`
                w-full px-3 py-2 
                border rounded-lg
                ${errors.title ? "border-red-500" : "border-gray-300"}
              `}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`
                w-full px-3 py-2 
                border rounded-lg
                ${errors.description ? "border-red-500" : "border-gray-300"}
              `}
              placeholder="Enter task description"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="
                bg-gray-800 text-white 
                px-4 py-2 rounded-lg 
                hover:bg-gray-700 
                transition-colors
              "
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                text-gray-600 
                hover:bg-gray-100 
                px-4 py-2 rounded-lg 
                transition-colors
              "
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;
