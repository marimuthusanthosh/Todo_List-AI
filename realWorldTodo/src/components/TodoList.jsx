import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoAtom } from "../store/atoms/Do";
import { filterAtom } from "../store/atoms/filter";
import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useRecoilValue(todoAtom);
  const filter = useRecoilValue(filterAtom).toLowerCase();
  const setTodos = useSetRecoilState(todoAtom); // For updating todos from backend

  // Filter todos by title or description
  const filteredTodos = todos.filter((todo) => {
    const titleMatch = todo.title.toLowerCase().includes(filter);
    const descMatch = todo.description.toLowerCase().includes(filter);
    return titleMatch || descMatch;
  });

  // Fetch todos only when button is clicked
  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTodos(data.your_todos); // Set fetched todos
      } else {
        console.error("Failed to fetch todos:", data);
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  }

  return (
    <div>
      <div>
        <button style={{ padding: 10, margin: 10 }} onClick={getData}>
          Show Task
        </button>
      </div>

      <div style={{ border: "2px solid black", marginTop: "10px" }}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo._id || todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
