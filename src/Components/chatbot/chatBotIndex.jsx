import React, { Fragment, useEffect, useRef, useState } from "react";
import ChatStyle from "./chatStyle.module.css";
import ChatBotPic from "../../assets/images/chatbotimage.png";
import DotMenus from "../../assets/images/horizontalDots.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faHeadphonesAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { MessageBox } from "../messageBox/messageComp";
//from redux store
import { useSelector, useDispatch } from "react-redux";
import {
  sendOutGoing,
  changeStatus,
  resetEditStage,
  editOutGoing,
} from "../../actions";
function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [show, setShow] = useState(false);
  const chatData = useSelector((state) => state.messages);
  const isTyping = useSelector((state) => state.isTyping);
  const editActionData = useSelector((state) => state.editAction);
  const userInputRef = useRef();
  const dispatch = useDispatch();
  //After page loads this will focus the user keyboard input
  useEffect(() => {
    userInputRef.current.focus();
  }, []);
  //To scroll down to bottom of the page when new message arrives/sent.
  useEffect(() => {
    if (!editActionData.state) {
      document.getElementById("chatbox").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [chatData, editActionData]);
  //This useEffect will set the user input when user tries to edit sent message anf make focus also
  useEffect(() => {
    if (editActionData.state) {
      if (String(editActionData.editMessage).trim() !== "") {
        setUserInput(editActionData.editMessage);
        userInputRef.current.focus();
      }
      setShow(false);
    }
  }, [editActionData]);
  // Handles the user input changes
  const handleUserChanges = (e) => {
    setUserInput(e.target.value);
    if (show) setShow(!show);
  };
  // Triggered when user enter/submit the message
  const handleUserInput = (e) => {
    e.preventDefault();
    if (isTyping) {
      return;
    }
    if (userInput.trim() !== "") {
      if (!editActionData.state) {
        dispatch(sendOutGoing(userInput));
        dispatch(changeStatus(true));
      } else {
        dispatch(editOutGoing(userInput, editActionData.editMessageId));
        dispatch(resetEditStage());
      }

      setUserInput("");
    }
  };
  return (
    <div className={ChatStyle.chatBotContainer}>
      {/* Top Navigation */}
      <div className={ChatStyle.topNav}>
        <span className="d-flex align-items-center">
          <span className={ChatStyle.chatProfileImg} title="I'm a Chat Bot">
            <img src={ChatBotPic} alt="chatbot" />
            <span className={ChatStyle.chatBotOnline}></span>
          </span>
          <span className="d-inline-block text-left">
            <h4>Chitty</h4>
            {isTyping ? (
              <small className="text-secondary font-weight-bold">
                typing...
              </small>
            ) : (
              <small className="text-muted font-weight-bold">Online</small>
            )}
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
            className="d-flex align-items-center h-100 p-1"
          >
            <input
              type="text"
              placeholder="Type your message..."
              className={ChatStyle.keyBoardInput}
              value={userInput}
              ref={userInputRef}
              onChange={(e) => handleUserChanges(e)}
            />
            <span className={ChatStyle.keybrdSendOption}>
              <button
                type="button"
                className={ChatStyle.sendBtn}
                title="Add Attachments"
                onClick={() => setShow(!show)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              {show && <KeyBoardSendOptions />}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
// This keyboard popup options are just for showcasing purpose.
function KeyBoardSendOptions() {
  return (
    <span className={ChatStyle.optionsPopup}>
      <div className={ChatStyle.optionsWrap}>
        <ul>
          <li key="audio">
            <button
              className={ChatStyle.sendOptionBtn}
              title={"Click to upload audio"}
            >
              <FontAwesomeIcon icon={faHeadphonesAlt} />
            </button>
          </li>
          <li key="image">
            <button
              className={ChatStyle.sendOptionBtn}
              title={"Click to upload images"}
            >
              <FontAwesomeIcon icon={faCamera} />
            </button>
          </li>
        </ul>
      </div>
    </span>
  );
}
export default ChatBot;
