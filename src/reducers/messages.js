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
const userInputMock = [
  ["hi", "hey", "hello", "hey there"],
  ["how are you", "how are things", "how you doing"],
  ["are you single", "marry me"],
  ["are you human", "are you robot"],

  ["happy", "good", "fantastic", "cool"],
  ["help", "assist", "will you help me"],
  ["thanks", "thank you"],
  ["bye", "good bye", "goodbye"],
];

const BotReplies = [
  ["Hello!", "Hi!", "Hey!", "Hi there!"],

  [
    "Fine... how are you?",
    "Good! Thanks. how are uou?",
    "Doing great! How do you do?",
  ],

  [
    "Sorry I have a boyfriend, brother.",
    "Is there any serious question you have?",
  ],

  ["Yes", "Hmm, sort of"],

  ["Thats great", "Good to hear", "Awesome!", "Superb!!"],

  ["What do you wanna know?", "Yes tell me.", "Yeah, for sure."],

  ["You're welcome", "No mention"],

  ["Goodbye", "See you soon", "Glad to connect with you"],
];

const alternativeReplies = [
  "Same",
  "LOL",
  "Go on...",
  "Try again",
  "I'm listening...",
  "Bro...",
];
function compare(preDataArray, responseArray, text) {
  let item;
  for (let x = 0; x < preDataArray.length; x++) {
    for (let y = 0; y < responseArray.length; y++) {
      if (text.search(String(preDataArray[x][y])) > -1) {
        let items = responseArray[x];
        item = items[Math.floor(Math.random() * items.length)];
        break;
      }
    }
  }
  return item;
}
const constructBotReply = (value) => {
  var botReply;
  let text = String(value)
    .toLowerCase()
    .replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/im/g, "")
    .replace(/i am/g, "")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  if (compare(userInputMock, BotReplies, text)) {
    botReply = compare(userInputMock, BotReplies, text);
  } else {
    botReply =
      alternativeReplies[Math.floor(Math.random() * alternativeReplies.length)];
  }
  return botReply;
};
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
      let constructMessage = constructBotReply(action.payload);
      let outMessage = {
        messageId: state.length + 1,
        message: constructMessage,
        type: action.type,
        deliveredBy: getCurrentTime(),
      };
      return [...state, outMessage];
    case "EDIT":
      let tempState = [...state];
      tempState.forEach((message, index) => {
        if (message.messageId === action.id) {
          tempState[index].message = action.payload;
        }
      });
      return tempState;
    default:
      return state;
  }
};

export default messageReducer;
