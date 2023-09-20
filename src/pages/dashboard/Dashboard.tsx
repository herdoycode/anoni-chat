import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";
import Message from "../../entities/Message";
import { socket } from "../../socket";
import "./Dashboard.scss";
import apiClient from "../../services/apiClient";

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
    apiClient
      .get("/anonys")
      .then((res) => setMessages(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    socket.on("getMessage", (message: Message) =>
      setMessages([...messages, message])
    );
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
      <div className="dashboard-wrapper">
        <div className="messages">
          {messages?.map((message) => (
            <div
              className={
                message.senderId === user?._id ? "message own" : "message"
              }
              key={message._id}
            >
              <img src={message.senderImg} alt="" />
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
                    senderId: user._id,
                    text: messageRef.current.value,
                    senderImg: user.avatar,
                  };
                  apiClient
                    .post("/anonys", message)
                    .then((res) => {
                      socket.emit("sendMessage", res.data);
                    })
                    .catch((err) => console.log(err));

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
