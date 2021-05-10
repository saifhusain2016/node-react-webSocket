import "./App.css";
import openSocket from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  function sendMessage() {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: value,
      }),
    };
    fetch("http://localhost:8000", req);
  }

  useEffect(() => {
    document.title = `You sent message ${count} times`;
    const socket = openSocket("http://localhost:8000");
    socket.on("chat", (data) => {
      console.log("listening...");
      if (data.action === "chatting") {
        setValue(data.message);
      }
    });
  });

  return (
    <div className="App">
      <h2>Chat Here</h2>
      <textarea
        id="chatInput"
        placeholder="Type Here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <div>
        <button onClick={sendMessage}>send Message</button>
      </div>
    </div>
  );
}

export default App;
