import messageReducer from "./messages";
import typingReducer from "./isTyping";
import editingReducer from "./isEditing";
import { combineReducers } from "redux";
//Here combining two reducers into one, so we can able to use all reducer using one single reference.
const rootReducers = combineReducers({
  messages: messageReducer,
  isTyping: typingReducer,
  editAction: editingReducer,
});
export default rootReducers;
