import CountUp from "react-countup";
import { useTaskContext } from "../context/TaskContext";

const TaskStats = () => {
  const { tasks } = useTaskContext();

  const statsData = [
    {
      label: "Total Tasks",
      value: tasks.length,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      hoverBg: "hover:bg-gray-100",
      shadowHover: "hover:shadow-2xl",
    },
    {
      label: "To Do",
      value: tasks.filter((t) => t.status === "To Do").length,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      hoverBg: "hover:bg-yellow-100",
      shadowHover: "hover:shadow-2xl",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      shadowHover: "hover:shadow-2xl",
    },
    {
      label: "Done",
      value: tasks.filter((t) => t.status === "Done").length,
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100",
      shadowHover: "hover:shadow-2xl",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat) => (
        <div
          key={stat.label}
          className={`
            ${stat.bgColor} ${stat.hoverBg} ${stat.shadowHover}
            p-4 rounded-lg shadow text-center 
            h-[120px] flex flex-col justify-center items-center 
            transition-all duration-300 ease-in-out
            transform hover:scale-105 
            cursor-pointer
            group
            relative
            overflow-hidden
            w-full
          `}
        >
          <h3
            className={`
              text-sm font-medium mb-2
              group-hover:text-opacity-80 text-gray-500
              transition-all duration-300
            `}
          >
            {stat.label}
          </h3>

          <CountUp
            start={0}
            end={stat.value}
            duration={2}
            className={`
              ${stat.color} 
              text-2xl md:text-3xl font-semibold 
              group-hover:scale-110 
              transition-transform duration-300
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
