import CountUp from "react-countup";
import { useTaskContext } from "../context/TaskContext";
import { ClipboardList, ListTodo, Clock, CheckCircle2 } from "lucide-react";

const TaskStats = () => {
  const { tasks } = useTaskContext();

  const statsData = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: ClipboardList,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      label: "To Do",
      value: tasks.filter((t) => t.status === "To Do").length,
      icon: ListTodo,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "Done").length,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8 cursor-pointer justify-center">
      {statsData.map((stat) => (
        <div
          key={stat.label}
          className={`
            ${stat.bgColor} rounded-xl p-4 
            flex flex-col items-center justify-center 
            shadow-lg hover:shadow-xl
            transition-all duration-300
            w-40 md:w-48
            transform hover:scale-105 hover:bg-opacity-90
          `}
        >
          <div
            className={`
            ${stat.color} mb-2 
            bg-white p-3 rounded-full 
            shadow-md
          `}
          >
            <stat.icon className="w-6 h-6" />
          </div>
          <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
          <CountUp
            end={stat.value}
            duration={2}
            className={`
              ${stat.color} 
              text-2xl font-bold
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
