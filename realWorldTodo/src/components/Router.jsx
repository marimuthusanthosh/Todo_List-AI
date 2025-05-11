import AddTodoForm from "./AddTodoForm";
import FilterInput from "./FilterInput";
import TodoList from "./TodoList";

function Router(){


  return(
    <div>
      <h1>📝 Todo App</h1>
      <AddTodoForm />
      <FilterInput />
      <TodoList />
    </div>
  )
}
export default Router;