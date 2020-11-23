import AppStyle from "./App.module.css";
import ChatBot from "./Components/chatbot/chatBotIndex";

function App() {
  return (
    <div className={AppStyle.App}>
      <section className={`${AppStyle.BoxWrapper} container`}>
        <ChatBot />
      </section>
    </div>
  );
}

export default App;
