//This action oi to store or send user messages to the bot/store
export const sendOutGoing = (message) => {
  return {
    type: "OUTGOING",
    payload: message,
  };
};
//This action is to send reply to the user
export const receiveInComing = (message) => {
  return {
    type: "INCOMING",
    payload: message,
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

//this will init the editing the message, it is like before updating to the store
export const setEditStage = (stageData) => {
  return {
    type: "EDITING",
    payload: stageData,
  };
};

export const resetEditStage = () => {
  return {
    type: "RESETEDIT",
  };
};
