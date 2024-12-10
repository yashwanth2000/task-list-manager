export const TaskStats = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{20}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">To Do</h3>
        <p className="mt-1 text-2xl font-semibold text-blue-600">{20}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
        <p className="mt-1 text-2xl font-semibold text-yellow-600">{20}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Done</h3>
        <p className="mt-1 text-2xl font-semibold text-green-600">{20}</p>
      </div>
    </div>
  );
};
