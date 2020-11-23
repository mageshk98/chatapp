const InitialState = [];
function getCurrentTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = parseInt(minutes) < 10 ? "0" + parseInt(minutes) : minutes;
  return `${hours}:${minutes} ${ampm}`;
}
const messageReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "OUTGOING":
      let inMessage = {
        messageId: state.length + 1,
        message: action.payload,
        type: action.type,
        deliveredBy: getCurrentTime(),
      };

      return state.concat(inMessage);
    case "INCOMING":
      let randomArr = [
        "hi there",
        "Howdy",
        "Welcome",
        "How can I help you?",
        "You good name?",
      ];
      let outMessage = {
        messageId: state.length + 1,
        message: randomArr[Math.floor(Math.random() * randomArr.length)],
        type: action.type,
        deliveredBy: getCurrentTime(),
      };
      return [...state, outMessage];
    case "EDIT":
      let tempState = [...state];
      tempState.forEach((message, index) => {
        if (message.messageId === action.id) {
          tempState[index] = action.payload;
        }
      });
      return tempState;
    default:
      return state;
  }
};

export default messageReducer;
