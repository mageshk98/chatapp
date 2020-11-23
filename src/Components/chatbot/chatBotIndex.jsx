import React from "react";
import ChatStyle from "./chatStyle.module.css";
import ChatBotPic from "../../assets/images/chatbotimage.png";
import DotMenus from "../../assets/images/horizontalDots.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ChatBot() {
  return (
    <div className={ChatStyle.chatBotContainer}>
      {/* Top Navigation */}
      <div className={ChatStyle.topNav}>
        <span className="d-flex align-items-center">
          <span className={ChatStyle.chatProfileImg}>
            <img src={ChatBotPic} alt="chatbot" />
          </span>
          <h4>Ask Hubino </h4>
        </span>
        <span className={ChatStyle.chatMenu} title="menu">
          <img src={DotMenus} alt="chatbotmenu" />
        </span>
      </div>
      {/* Message section */}
      <div className={ChatStyle.messageSection}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu lectus,
        pulvinar nec felis vitae, rhoncus dictum lorem. Phasellus ultrices nisi
        non accumsan eleifend. Morbi ac tincidunt augue, sit amet blandit mi.
        Suspendisse scelerisque consequat dolor, eu iaculis sem placerat sit
        amet. In aliquet orci erat, sed scelerisque sapien sodales non.
        Pellentesque luctus molestie dignissim. Duis dictum, lectus vel
        ullamcorper dignissim, dolor sem ullamcorper quam, in rhoncus lorem elit
        et lectus. Maecenas posuere aliquet felis, non auctor enim volutpat id.
        Maecenas vel ex sit amet urna bibendum congue sit amet a mauris. Vivamus
        cursus urna at tincidunt interdum. In interdum ante iaculis libero
        bibendum, sed venenatis orci rutrum. Nunc congue dui vitae risus
        imperdiet dictum. Aliquam erat volutpat. Vestibulum ac lorem orci. Sed
        gravida suscipit risus, quis sollicitudin leo tempor sed. Nam bibendum
        est in malesuada iaculis. Ut interdum dui eget gravida laoreet.
        Phasellus eget mi dolor. Fusce pretium nunc laoreet eleifend laoreet. In
        vel neque placerat, blandit ligula sed, accumsan ligula. Nullam at
        tristique purus, vel convallis mi. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Nunc quam
        lacus, tincidunt non commodo sed, rhoncus vel purus. Duis sed aliquam
        nisi. Duis sit amet ligula lobortis, malesuada diam non, sagittis enim.
        Nullam mattis interdum convallis. Donec non nulla vitae risus molestie
        pretium. Nullam a sapien pellentesque, feugiat nisi sit amet, iaculis
        tortor. Sed vel lacus eros. Suspendisse accumsan at ante convallis
        gravida. Cras a purus massa. Suspendisse vitae enim est. Donec mollis
        dui sit amet arcu accumsan lobortis. Sed efficitur lobortis cursus.
        Nullam feugiat nisi tincidunt venenatis placerat. Duis varius augue
        augue, id sodales turpis sollicitudin vel. Maecenas et volutpat velit.
        Proin ut purus id quam luctus elementum nec eu nulla. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Nunc blandit cursus
        turpis non pellentesque. Morbi placerat congue aliquet. Pellentesque
        eleifend nec orci eget porta. Nullam ipsum libero, commodo ac nisi a,
        dignissim mattis eros. Phasellus id nibh consequat ante sollicitudin
        eleifend non quis ipsum. Nunc tellus sapien, laoreet nec semper
        elementum, pharetra nec orci. Suspendisse consequat mattis lorem, eu
        sodales tortor tempor ac. Vivamus cursus maximus erat vel sollicitudin.
        Nam dapibus tortor eleifend elementum condimentum. Praesent dui nisl,
        suscipit finibus interdum at, dictum vitae mi. Etiam ultrices est vitae
        mauris scelerisque, nec rhoncus lectus ultricies. Mauris luctus ante vel
        diam ultrices pellentesque. Aliquam non velit id purus ultrices
        porttitor a vitae diam. Pellentesque in magna id mauris varius molestie
        non semper risus. Mauris feugiat odio vel lacus varius, non lacinia
        dolor ornare. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Nullam tempor venenatis cursus. Nullam lorem nibh, elementum
        eget pellentesque nec, ultricies vitae augue. Pellentesque bibendum
        vulputate ex, nec semper neque luctus eget. Donec interdum massa eget
        nisl efficitur, a accumsan elit fermentum. Mauris ornare leo vel nibh
        dapibus sollicitudin.
      </div>
      {/* keyboard section */}
      <div className={ChatStyle.keyboardSection}>
        <div className={ChatStyle.typeSection}>
          <input
            type="text"
            placeholder="Type your message..."
            className={ChatStyle.keyBoardInput}
          />

          <button className={ChatStyle.sendBtn} title="Add Attachments">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
