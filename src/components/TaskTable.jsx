import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { useTaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  "To Do": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Done: "bg-green-100 text-green-800",
};

const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

const TaskTable = () => {
  const tableRef = useRef(null);
  const { filteredTasks, updateTask, deleteTask } = useTaskContext();

  useEffect(() => {
    if (!tableRef.current) return;

    const table = new Tabulator(tableRef.current, {
      data: filteredTasks,
      layout: "fitColumns",
      columns: [
        {
          title: "ID",
          field: "id",
          width: 80,
        },
        {
          title: "Title",
          field: "title",
          editor: "input",
          cellEdited: (cell) => {
            const row = cell.getRow();
            const task = row.getData();
            updateTask(task.id, { title: task.title });
            toast.success("Task updated successfully");
          },
        },
        {
          title: "Description",
          field: "description",
          editor: "textarea",
          cellEdited: (cell) => {
            const row = cell.getRow();
            const task = row.getData();
            updateTask(task.id, { description: task.description });
            toast.success("Task updated successfully");
          },
        },
        {
          title: "Status",
          field: "status",
          formatter: (cell) => {
            const task = cell.getRow().getData();
            return `
              <select 
                class="status-dropdown ${
                  STATUS_COLORS[task.status]
                } block w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                ${STATUS_OPTIONS.map(
                  (status) => `
                    <option value="${status}" ${
                    status === task.status ? "selected" : ""
                  }>${status}</option>
                  `
                ).join("")}
              </select>`;
          },
          cellClick: (e, cell) => {
            if (e.target.classList.contains("status-dropdown")) {
              const newStatus = e.target.value;
              const task = cell.getRow().getData();
              if (newStatus !== task.status) {
                updateTask(task.id, { status: newStatus });
                toast.success(`Status changed to ${newStatus}`);
              }
            }
          },
        },
        {
          title: "Actions",
          formatter: () => {
            return `
              <button
                class="text-red-500 bg-transparent border border-transparent rounded-md px-3 py-2 font-medium transition-all hover:bg-red-100 hover:text-red-700 hover:border-red-300 active:bg-red-200 active:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>
            `;
          },
          cellClick: (e, cell) => {
            const task = cell.getRow().getData();
            deleteTask(task.id);
            toast.success("Task deleted successfully");
          },
        },
      ],
    });

    return () => table.destroy();
  }, [filteredTasks, updateTask, deleteTask]);

  return <div ref={tableRef} className="bg-white rounded-lg shadow-md p-4" />;
};

export default TaskTable;
