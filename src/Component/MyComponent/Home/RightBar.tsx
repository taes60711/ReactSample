import { Dispatch, SetStateAction, memo, useState } from "react";
import './RightBar.scss';
import ReactIcon from "../../Tools/ReactIcon";


const ChatRoom = memo((props: { chatRoomIsOpen: boolean, setChatRoomIsOpen: Dispatch<SetStateAction<boolean>> }) => {
    console.log("ChatRoom");
    if (props.chatRoomIsOpen) {
        return (
            <div className="chatRoomContainer">
                
            </div>
        );
    } else {
        return (
            <>
            </>
        );
    }
    
})

export const RightBar = memo(() => {
    console.log("RightBar");
    const [chatRoomIsOpen, setChatRoomIsOpen] = useState<boolean>(false);
    return (
        <div className="rightbar" >
            <button className="chatRoomIcon" onClick={() => { setChatRoomIsOpen(!chatRoomIsOpen) }}>
                <ReactIcon icon={"AiFillWechat"} module={"ai"} size={40} />
            </button>

            <ChatRoom
                chatRoomIsOpen={chatRoomIsOpen}
                setChatRoomIsOpen={setChatRoomIsOpen} />
        </div>
    );
})