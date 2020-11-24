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
  ["how are you", "how are things"],
  ["are you single", "marry me"],
  ["are you human", "are you robot"],

  ["happy", "good", "fantastic", "cool"],
  ["help", "assist"],
  ["thanks", "thank you"],
  ["bye", "good bye", "goodbye"],
];

const BotReplies = [
  ["Hello!", "Hi!", "Hey!", "Hi there!"],

  ["Fine... how are you?", "Good! Thanks. how are uou?"],

  [
    "Sorry I have a boyfriend, brother.",
    "Is there any serious question you have?",
  ],

  ["Yes", "Hmm, sort of"],

  ["Thats great", "Good to hear", "Awesome!", "Superb!!"],

  ["What do you wanna know?", "Yes tell me."],

  ["You're welcome", "No mention"],

  ["Goodbye", "See you soon", "Glad to connect with you"],
];

const alternativeReplies = [
  "Same",
  "Go on...",
  "Try again",
  "I'm listening...",
  "Bro...",
];
function compare(triggerArray, replyArray, text) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      console.log(triggerArray[x][y]);
      if (String(triggerArray[x][y]).search(text)) {
        let items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  return item;
}
const constructBotReply = (value) => {
  var product;
  let text = String(value)
    .toLowerCase()
    .replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  if (compare(userInputMock, BotReplies, text)) {
    product = compare(userInputMock, BotReplies, text);
  } else if (text.match(/robot/gi)) {
    product = BotReplies[Math.floor(Math.random() * BotReplies.length)];
  } else {
    product =
      alternativeReplies[Math.floor(Math.random() * alternativeReplies.length)];
  }
  console.log(product);
  return product;
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
      // let randomArr = [
      //   "hi there",
      //   "Howdy",
      //   "Welcome",
      //   "How can I help you?",
      //   "You good name?",
      //   "The underlying Git plumbing tools, such as git ls-files and git read-tree, read gitignore patterns specified by command-line options, or from files specified by command-line options. Higher-level Git tools, such as git status and git add, use patterns from the sources specified above.",
      // ];
      let outMessage = {
        messageId: state.length + 1,
        // message: randomArr[Math.floor(Math.random() * randomArr.length)],
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
