import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoAtom } from "../store/atoms/Do"; 

function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const setTodos = useSetRecoilState(todoAtom);

 async function addTask() {
    if (!title.trim()) return;

    try{
      const response= await fetch("http://localhost:3000/todo",{
        method:"POST", 
        headers: {
          "content-Type":"application/json",
          "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcmtpcmF0IiwiaWF0IjoxNzQ2NDMxMTIzfQ.Osj1A4a6cZTpdPXkzEZtCXs-nqMzm_ZszHHjAjPH5yE"
        },
        body: JSON.stringify({
          title,
          description,
          completed:false
        })

      })
      const data=await response.json();

      if(response.ok){
        setTodos((prevTodos) => [
          ...prevTodos,
          {
            title,
            description,
            completed: false,
          },
        ]);

        // Clear inputs
        setTitle("");
        setDescription("");
      } 
      else{
        console.error("server error", data.message);
      }
    } catch(err){
      console.error("Request failed:", err);


    }  


  }

  return (
    <div>
      <input  style={{padding:10, margin:10}}
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text" style={{padding:10, margin:10}}
        placeholder="Enter a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button style={{padding:10, margin:10}} onClick={addTask}>Add Task</button>
    </div>
  );
}

export default AddTodoForm;
