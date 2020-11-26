//The is where all messages stored.
const INITIALSTATE = [];
// To get the current time with correct meridiums..
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
// Following Object will have tje predefined user message expectations, relative bot replies and other alternative replies.
const REPLIES = {
  userInputMock: [
    ["hi", "hey", "hello", "hey there", "hai"],
    ["how are you", "how are things", "how you doing"],
    ["are you single", "are you human", "are you robot"],
    ["happy", "good", "fantastic", "cool"],
    ["help", "assist", "will you help me"],
    ["thanks", "thank you"],
    ["no", "not at all", "yes", "yep"],
    ["bye", "good bye", "goodbye"],
  ],
  BotReplies: [
    [
      "Hello!",
      "Hi 👋 ! It's good to see you!",
      "Hey! 😀",
      "Hi there!",
      "Great to see you here! 😊",
    ],

    [
      "Fine... how are you?",
      "Good! Thanks. how are uou?",
      "Doing great! How do you do?",
    ],

    [
      "I'm a bot programmed to answer only some of the frequent questions.",
      "Is there any serious question you have?",
      "Let me know if you have any question!",
    ],

    ["Thats great", "Good to hear", "Awesome!", "Superb!!"],

    [
      "What do you wanna know?",
      "Yes tell me. How can I help you?.",
      "Yeah, for sure.",
    ],

    ["You're welcome", "No mention"],
    ["Okay, fine!", "Got it.", "Alright!", "Fine..."],
    ["Goodbye 👋", "See you soon", "Glad to connect with you"],
  ],
  alternativeReplies: [
    "LOL",
    "Okay, then.",
    "Go on...",
    "Pardon",
    "I'm listening!",
    "Bro...",
    "I'm a bot programmed to answer only some of the frequent questions.",
  ],
};
//This function is to compare the user message with relative bot replies we have then will send the matched string accordingly.
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
// This function will evaluate the current user message and return the relative reply text..
const constructBotReply = (value) => {
  var botReply;
  let text = String(value)
    .toLowerCase()
    .replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/im/g, "")
    .replace(/ doin'/g, "doing")
    .replace(/i am/g, "")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/ r /g, " are ")
    .replace(/ u /g, " you ")
    .replace(/please /g, "")
    .replace(/ please/g, "");
  console.log("updated text input", text);
  let { userInputMock, BotReplies, alternativeReplies } = REPLIES;
  if (compare(userInputMock, BotReplies, text)) {
    botReply = compare(userInputMock, BotReplies, text);
  } else {
    botReply =
      alternativeReplies[Math.floor(Math.random() * alternativeReplies.length)];
  }
  return botReply;
};
// This reducer to handle tje incoming/outgoing/editingSent messages
const messageReducer = (state = INITIALSTATE, action) => {
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
