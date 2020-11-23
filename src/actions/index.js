//This action oi to store or send user messages to the bot/store
export const sendOutGoing = (message) => {
  return {
    type: "OUTGOING",
    payload: message,
  };
};
//This action is to send reply to the user
export const receiveInComing = () => {
  return {
    type: "INCOMING",
  };
};
//This action is to handle editing messages
export const editOutGoing = (editedMessage, messageId) => {
  return {
    type: "EDIT",
    id: messageId,
    payload: editedMessage,
  };
};
//this will change the state of typing if chat is start to reply the user message
export const changeStatus = (currentState) => {
  return {
    type: "TYPING",
    payload: currentState,
  };
};
