import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { todoAtom } from "../store/atoms/Do";

function TodoItem({ todo }) {
  const todos = useRecoilValue(todoAtom);
  const setTodos = useSetRecoilState(todoAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const toggleCompletion = async () => {
    const updatedTodos = todos.map((t) =>
      t._id === todo._id ? { ...t, completed: !t.completed } : t
    );

    setTodos(updatedTodos); // update UI optimistically

    try {
      await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo._id,
          completed: !todo.completed,
        }),
      });
    } catch (err) {
      console.error("Failed to update todo on server", err);
    }
  };

  const remove = async () => {
    const updatedTodos = todos.filter((t) => t._id !== todo._id);
    setTodos(updatedTodos);

    try {
      await fetch("http://localhost:3000/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo._id,
        }),
      });
    } catch (err) {
      console.error("Failed to remove todo on server", err);
    }
  };

  const askAI = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCxmewxgPaYBkv7o0h8PsWBJ5boAwmcz-8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Provide useful advice or improvements for the following todo description:\n\n"${todo.description}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini API Response:", data); // 👈 Log full response

    const suggestion =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.text || // fallback
      "No suggestions available.";

    navigate("/ai", { state: { suggestion } });
  } catch (err) {
    console.error("Error fetching from Gemini:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ margin: "10px 0", padding: "8px", border: "1px solid #ccc" }}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button style={{ padding: 5, margin: 5 }} onClick={toggleCompletion}>
        {todo.completed ? "Completed" : "Not Completed"}
      </button>
      <button style={{ padding: 5, margin: 5 }} onClick={remove}>
        Remove
      </button>
      <button style={{ padding: 5, margin: 5 }} onClick={askAI} disabled={loading}>
        {loading ? "Asking AI..." : "Ask AI"}
      </button>
      <p>{todo._id}</p>
    </div>
  );
}

export default React.memo(TodoItem);
