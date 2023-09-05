import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";
import Message from "../../entities/Message";
import { socket } from "../../socket";
import "./Dashboard.scss";

const Messages = () => {
  const navigate = useNavigate();
  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
  }, [token]);

  useEffect(() => {
    socket.on("getMessage", (message) => setMessages([...messages, message]));
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="messages">
        <div className="center">
          {messages?.map((message) => (
            <div
              className={
                message.sender === user._id ? "message own" : "message"
              }
              key={message.id}
            >
              <img src={message.avatar} alt="" />
              <div className="text">
                <p>{message.text}</p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef}></div>
        </div>
        <div className="bottom">
          <div className="sent-box">
            <div className="input">
              <input
                ref={messageRef}
                type="text"
                placeholder="Type your messages"
              />
              <div className="emoji">
                <BsEmojiSmile />
              </div>
            </div>
            <button
              onClick={() => {
                if (messageRef.current && messageRef.current.value) {
                  const message = {
                    id: `dd${Date.now()}`,
                    text: messageRef.current.value,
                    avatar: user.avatar,
                    sender: user._id,
                  };
                  socket.emit("sendMessage", message);
                  messageRef.current.value = "";
                }
              }}
            >
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
