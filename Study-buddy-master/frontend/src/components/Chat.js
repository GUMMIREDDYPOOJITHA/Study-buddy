import React, { useState, useEffect } from "react";
import "../styles.css/Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { FiShare } from "react-icons/fi";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileRequest, setFileRequest] = useState(null);
  const [fileToSend, setFileToSend] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const sendMessage = async () => {
    if (message !== "") {
      const messageContent = {
        room,
        user: username,
        message,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`
      };

      await socket.emit("send_message", messageContent);
      setMessages((prev) => [...prev, messageContent]);
      setMessage("");
    }
  };

  const sendFileRequest = () => {
    if (fileToSend) {
      const reader = new FileReader();
      reader.onload = () => {
        socket.emit("request_file", {
          room,
          sender: username,
          fileName: fileToSend.name,
          fileContent: reader.result,
        });
        setUploadProgress(100); // Simulate complete upload
      };
      reader.readAsDataURL(fileToSend); // Encode file as base64
    }
  };

  const handleFileAccept = () => {
    socket.emit("accept_file", { room, sender: fileRequest.sender });
  
    setTimeout(() => {
      setFileData(fileRequest); // Save file data for download
      setFileRequest(null); // Clear request
    }, 100);
  };

  const handleFileDecline = () => {
    socket.emit("decline_file", { room, sender: fileRequest.sender });
    setFileRequest(null); // Clear the request
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleFileRequest = (data) => {
      setFileRequest(data);
    };
    socket.on("file_transfer_start", (data) => {
        setMessages((prev) => [
          ...prev,
          { user: data.sender, message: `Sent file: ${data.fileName}` },
        ]);
      });
    
      
    socket.on("receive_message", handleReceiveMessage);
    socket.on("file_request", handleFileRequest);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("file_request", handleFileRequest);
      socket.off("file_transfer_start");
    };
  }, [socket,messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages.map((messageData, index) => (
            <div
              key={index}
              className="message"
              id={username === messageData.user ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageData.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageData.time}</p>
                  <p id="author">{messageData.user}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Incoming file-sharing request */}
          {fileRequest && (
            <div className="file-request-popup">
              <p>
                {fileRequest.sender} wants to send you a file:{" "}
                {fileRequest.fileName}
              </p>
              <div className="popup-actions">
                <button onClick={handleFileAccept} className="accept-btn">
                  Accept
                </button>
                <button onClick={handleFileDecline} className="decline-btn">
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Accepted file */}
          {fileData && (
            <div className="message">
              <div className="message-content">
                <p>
                  File received: {fileData.fileName}{" "}
                  <a
                    href={fileData.fileContent}
                    download={fileData.fileName}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Download
                  </a>
                </p>
              </div>
            </div>
          )}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Hey..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
        <input
          type="file"
          onChange={(e) => setFileToSend(e.target.files[0])}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          📎
        </label>
        <button onClick={sendFileRequest}><FiShare /></button>
      </div>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
