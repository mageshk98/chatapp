import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveInComing, setEditStage, changeStatus } from "../../actions";
import MessageBoxStyle from "./messageBoxStyle.module.css";
function MessageBox({ detail }) {
  if (detail.type === "OUTGOING") {
    return <OutGoingMessageBox data={detail} />;
  } else {
    return <InComingMessageBox data={detail} />;
  }
}

function OutGoingMessageBox(props) {
  const dispatch = useDispatch();
  const isTyping = useSelector((state) => state.isTyping);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    let timer;
    if (isTyping) {
      timer = setTimeout(() => {
        dispatch(receiveInComing(props.data.message));
        dispatch(changeStatus(false));
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        setIsEditing(false);
      }, 2000);
    }
  }, [isEditing]);
  const triggerEdit = () => {
    if (!props.data.messageId) {
      return;
    }
    dispatch(
      setEditStage({
        state: true,
        editMessageId: props.data.messageId,
        editMessage: props.data.message,
      })
    );

    setIsEditing(true);
  };
  return (
    <div
      className={`${MessageBoxStyle.chatBotContainer} justify-content-end ${
        isEditing ? MessageBoxStyle.active : ""
      }`}
    >
      <div
        className={`${MessageBoxStyle.flexWrapper} align-items-end`}
        title={props.data.message}
      >
        <span className={MessageBoxStyle.outGoing}>
          <p className={MessageBoxStyle.messageContent}>{props.data.message}</p>
          <span className={`${MessageBoxStyle.messageMenu} dropdown`}>
            <FontAwesomeIcon
              title={"Edit this Message"}
              icon={faChevronDown}
              className={`${MessageBoxStyle.messageMenuIcon} dropdown-toggle`}
              data-toggle="dropdown"
              role="button"
            />

            <div
              className={`${MessageBoxStyle.messageMenuDropDown} dropdown-menu`}
            >
              <ul>
                <li
                  className={MessageBoxStyle.messageMenuItem}
                  title="Click to edit"
                  onClick={() => triggerEdit()}
                >
                  Edit
                </li>
              </ul>
            </div>
          </span>
        </span>
        <small className="mt-1 mr-1">{props.data.deliveredBy}</small>
      </div>
    </div>
  );
}

function InComingMessageBox(props) {
  return (
    <div
      className={`${MessageBoxStyle.chatBotContainer} justify-content-start`}
    >
      <div className={`${MessageBoxStyle.flexWrapper} align-items-start`}>
        <span className={MessageBoxStyle.inComing}>
          <p className={MessageBoxStyle.messageContent}>{props.data.message}</p>
        </span>
        <small className="mt-1 ml-1">{props.data.deliveredBy}</small>
      </div>
    </div>
  );
}
export { MessageBox };
