const INITIALSTATE = {
  state: false,
  editMessageId: "",
  editMessage: "",
};
//This reducer will handle dispathced action by the user to edit the sent messages and update in the store.
const editingReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "EDITING":
      return action.payload;
    case "RESETEDIT":
      return INITIALSTATE;
    default:
      return state;
  }
};
export default editingReducer;
