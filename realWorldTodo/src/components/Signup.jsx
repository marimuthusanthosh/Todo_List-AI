import { useState } from "react";
import { useRecoilState } from "recoil";
import { signAtom } from "../store/atoms/sign";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useRecoilState(signAtom);
  const navigate = useNavigate();

  async function proceed() {
    try {
      // Step 1: Get existing users
      const response = await fetch("http://localhost:3000/signin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const users = data.message;

      // Step 2: Check if user exists
      const userExists = users.some(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        navigate("/route");
        return;
      }

      // Step 3: Register new user if not exists
      const signupResponse = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const signupData = await signupResponse.json();

      if (signupResponse.ok) {
        setSignup((prev) => [...prev, { username, password }]);
        setUsername("");
        setPassword("");
        navigate("/route");
      } else {
        alert(signupData.message || "Signup failed");
      }
    } catch (err) {
      console.error("Server error:", err);
    }
  }

  return (
    <div>
      <h2>SignUp | SignIN</h2>
      <input style={{padding:10, margin:10}}
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input style={{padding:10, margin:10}}
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{padding:10, margin:10}} onClick={proceed}>SignUp</button>
    </div>
  );
}

export default Signup;
