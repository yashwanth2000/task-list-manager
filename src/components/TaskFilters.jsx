import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";
import { useDebounce } from "../utils/useDebounce";

const TaskFilters = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { setSearchQuery, filterStatus, setFilterStatus } = useTaskContext();
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-xl shadow-md transition-opacity duration-500">
      {/* Search Input */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition duration-300"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-48 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 appearance-none cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 transition-transform duration-300">
          <Filter className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
