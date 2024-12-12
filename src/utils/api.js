const URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    const mappedTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: `Task ${task.id} description`,
          status: task.completed ? 'Done' : 'To Do'
        }));

    console.log(mappedTasks);
    return mappedTasks;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};
