import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Home from "./Home";
import "../styles.css/Home.css";

const socket = io.connect("http://localhost:3001");

function App() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (name !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
    <div style={{ display: "flex" }}>
        <div className="left-column" style={{ flex: 1 }}>
               <Home />
            </div>
  
    <div className="right-column" style={{ flex: 1, padding: "20px" }}></div>
    <div className="App">
        
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your Name!!!"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={name} room={room} />
      )}
    </div>
    </div>
    );
}

export default App;