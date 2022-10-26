import React from "react";
import "./styles.css"

const ChatCard = ({ me, children }) => {
    return (
        <div className={me ? "sentMessage" : "receivedMessage"}>
            <div className={me ? "sentMessageBox" : "receivedMessageBox"}>
                {children}
            </div>
        </div>
    )
}

export default ChatCard;

