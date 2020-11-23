const typingReducer = (state = false, action) => {
  switch (action.type) {
    case "TYPING":
      return action.payload;
    default:
      return state;
  }
};
export default typingReducer;
