const URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    const todo = data.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        description: todo.description || "",
        completed: todo.completed ? "Done" : "To Do",
      };
    });

    return todo;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};
