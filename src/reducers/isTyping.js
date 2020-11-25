//This reducer to update the store if the bot is currently constructing the reply for the user, so that user will know bot is replying.
const typingReducer = (state = false, action) => {
  switch (action.type) {
    case "TYPING":
      return action.payload;
    default:
      return state;
  }
};
export default typingReducer;
