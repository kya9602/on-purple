import React from "react";
import VideoChatConnect from "../components/VideoChat/VideoChatConnect";

const VChatPage = () => {
    /* 화상 마이크 권한 요청 */ 
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(function(stream) {
        /* 스트림 사용 */
        })
        .catch(function(err) {
        /* 오류 처리 */
    });
    return (
        <>
            <VideoChatConnect />
        </>

    )
}

export default VChatPage;