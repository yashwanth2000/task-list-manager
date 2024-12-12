import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { useTaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";

const TaskTable = () => {
  const tableRef = useRef(null);
  const { filteredTasks,updateTask, deleteTask } = useTaskContext();

  useEffect(() => {
    if (!tableRef.current) return;

    const table = new Tabulator(tableRef.current, {
      data: filteredTasks,
      layout:"fitDataTable",
      columns: [
        { title: "ID", field: "id", width: 80 },
        {
          title: "Title",
          field: "title",
          editor: "input",
          validator: ["required", "string"],
          width: 200,
        },
        {
          title: "Description",
          field: "description",
          editor: "textarea",
          width: 300,
        },
        {
          title: "Status",
          field: "status",
          editor: "select",
          editorParams: {
            values: ["To Do", "In Progress", "Done"],
          },
          width: 120,
        },
        {
          title: "Actions",
          formatter: function () {
            const btn = document.createElement("button");
            btn.innerHTML = "Delete";
            btn.className =
              "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600";
            return btn;
          },
          cellClick: function (_e, cell) {
            const taskId = cell.getRow().getData().id;
            deleteTask(taskId);
            toast.success("Task deleted successfully");
          },
        },
      ],
      cellEdited: function (cell) {
        const row = cell.getRow();
        const task = row.getData();
        updateTask(task.id, task);
        toast.success("Task updated successfully");
      },
    });

    return () => {
      table.destroy();
    };
  }, [filteredTasks, updateTask, deleteTask]);

  return <div ref={tableRef} className="mt-4" />;
};

export default TaskTable;
