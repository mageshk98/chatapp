const InitialState = {
  state: false,
  editMessageId: "",
  editMessage: "",
};
const editingReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "EDITING":
      return action.payload;
    case "RESETEDIT":
      return InitialState;
    default:
      return state;
  }
};
export default editingReducer;
