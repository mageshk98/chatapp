import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveInComing, editOutGoing, changeStatus } from "../../actions";
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
  useEffect(() => {
    let timer;
    if (isTyping) {
      timer = setTimeout(() => {
        dispatch(receiveInComing());
        dispatch(changeStatus(false));
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`${MessageBoxStyle.chatBotContainer} justify-content-end`}>
      <span className={MessageBoxStyle.outGoing}>
        <p className={MessageBoxStyle.messageContent}>{props.data.message}</p>
        <FontAwesomeIcon icon={faPencilAlt} />
      </span>
      <small>{props.data.deliveredBy}</small>
    </div>
  );
}

function InComingMessageBox(props) {
  return (
    <div
      className={`${MessageBoxStyle.chatBotContainer} justify-content-start`}
    >
      <span className={MessageBoxStyle.inComing}>
        <p className={MessageBoxStyle.messageContent}>{props.data.message}</p>
      </span>
      <small>{props.data.deliveredBy}</small>
    </div>
  );
}
export { MessageBox };
