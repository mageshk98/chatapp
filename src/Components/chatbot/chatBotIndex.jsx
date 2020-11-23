import React, { Fragment, useEffect, useState } from "react";
import ChatStyle from "./chatStyle.module.css";
import ChatBotPic from "../../assets/images/chatbotimage.png";
import DotMenus from "../../assets/images/horizontalDots.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MessageBox } from "../messageBox/messageComp";
//from redux store
import { useSelector, useDispatch } from "react-redux";
import { sendOutGoing, changeStatus } from "../../actions";
function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const chatData = useSelector((state) => state.messages);
  const isTyping = useSelector((state) => state.isTyping);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hit");
    document
      .getElementById("chatbox")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [chatData]);

  const handleUserInput = (e) => {
    e.preventDefault();
    if (isTyping) {
      return;
    }
    if (userInput.trim() !== "") {
      dispatch(sendOutGoing(userInput));
      dispatch(changeStatus(true));
      setUserInput("");
    }
  };
  return (
    <div className={ChatStyle.chatBotContainer}>
      {/* Top Navigation */}
      <div className={ChatStyle.topNav}>
        <span className="d-flex align-items-center">
          <span className={ChatStyle.chatProfileImg}>
            <img src={ChatBotPic} alt="chatbot" />
          </span>
          <span className="d-inline-block text-left">
            <h4>Ask Hubino </h4>
            {isTyping ? (
              <small className="text-secondary font-weight-bold">
                <i>typing...</i>
              </small>
            ) : null}
          </span>
        </span>
        <span className={ChatStyle.chatMenu} title="menu">
          <img src={DotMenus} alt="chatbotmenu" />
        </span>
      </div>
      {/* Message section */}
      <div className={ChatStyle.messageSection}>
        <div id="chatbox">
          {chatData.length > 0
            ? chatData.map((chat, _index) => (
                <Fragment key={_index}>
                  <MessageBox detail={chat} />
                </Fragment>
              ))
            : null}
        </div>
      </div>
      {/* keyboard section */}
      <div className={ChatStyle.keyboardSection}>
        <div className={ChatStyle.typeSection}>
          <form
            onSubmit={handleUserInput}
            className="d-flex align-items-center"
          >
            <input
              type="text"
              placeholder="Type your message..."
              className={ChatStyle.keyBoardInput}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />

            <button
              type="submit"
              className={ChatStyle.sendBtn}
              title="Add Attachments"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
